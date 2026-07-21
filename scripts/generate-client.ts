import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

interface OpenApiParameter {
  in: string;
  name: string;
}

interface OpenApiOperation {
  summary?: string;
  description?: string;
  parameters?: OpenApiParameter[];
  requestBody?: {
    content?: Record<string, unknown>;
  };
}

interface OpenApiContract {
  paths: Record<string, Record<string, OpenApiOperation>>;
}

interface ClientOperation {
  method: string;
  path: string;
  name: string;
  aggregateName?: string;
  service: string;
  aliases?: Record<string, string>;
}

const root = resolve(import.meta.dirname, "..");
const contractPath = resolve(root, "openapi/tradera-v4.json");
const operationsPath = resolve(root, "openapi/client-operations.json");
const generatedDir = resolve(root, "src/generated/rest");
const schemaPath = resolve(generatedDir, "schema.ts");
const clientPath = resolve(generatedDir, "client.ts");
const httpMethods = new Set(["get", "post", "put", "patch", "delete"]);

const contract = JSON.parse(await readFile(contractPath, "utf8")) as OpenApiContract;
const operations = JSON.parse(await readFile(operationsPath, "utf8")) as ClientOperation[];
const contractOperations: Array<ClientOperation & { operation: OpenApiOperation }> = [];

for (const [path, pathItem] of Object.entries(contract.paths)) {
  if (!path.startsWith("/v4/")) continue;
  for (const [method, operation] of Object.entries(pathItem)) {
    if (httpMethods.has(method)) {
      contractOperations.push({ method, path, name: "", service: "", operation });
    }
  }
}

const operationKey = ({ method, path }: Pick<ClientOperation, "method" | "path">) =>
  `${method.toUpperCase()} ${path}`;
const configured = new Map<string, ClientOperation>();
for (const operation of operations) {
  const key = operationKey(operation);
  if (configured.has(key)) throw new Error(`Duplicate client operation: ${key}`);
  configured.set(key, operation);
}

const missing = contractOperations.filter((operation) => !configured.has(operationKey(operation)));
const unknown = operations.filter(
  (operation) => !contractOperations.some((candidate) => operationKey(candidate) === operationKey(operation)),
);
if (missing.length || unknown.length) {
  throw new Error([
    ...missing.map((operation) => `Missing client operation: ${operationKey(operation)}`),
    ...unknown.map((operation) => `Unknown client operation: ${operationKey(operation)}`),
  ].join("\n"));
}

await mkdir(generatedDir, { recursive: true });
const openapiTypescript = resolve(root, "node_modules/.bin/openapi-typescript");
const generation = spawnSync(openapiTypescript, [contractPath, "-o", schemaPath], {
  cwd: root,
  encoding: "utf8",
  stdio: "inherit",
});
if (generation.status !== 0) process.exit(generation.status ?? 1);

function quote(value: string) {
  return JSON.stringify(value);
}

function requestType(operation: ClientOperation, aggregate: boolean) {
  const base = `Request<${quote(operation.path)}, ${quote(operation.method)}>`;
  const aliases = aggregate ? {} : (operation.aliases ?? {});
  const entries = Object.entries(aliases);
  if (!entries.length) return base;
  const originalNames = entries.map(([original]) => quote(original)).join(" | ");
  const aliasFields = entries
    .map(([original, alias]) => `${alias}: ${base}[${quote(original)}]`)
    .join("; ");
  return `Omit<${base}, ${originalNames}> & { ${aliasFields} }`;
}

function renderMethod(metadata: ClientOperation, aggregate: boolean) {
  const contractOperation = contract.paths[metadata.path][metadata.method];
  const methodName = aggregate ? (metadata.aggregateName ?? metadata.name) : metadata.name;
  const parameters = contractOperation.parameters ?? [];
  const pathNames = parameters.filter((parameter) => parameter.in === "path").map((parameter) => parameter.name);
  const hasQuery = parameters.some((parameter) => parameter.in === "query");
  const hasBody = Boolean(contractOperation.requestBody?.content?.["application/json"]);
  const aliases = aggregate ? {} : (metadata.aliases ?? {});
  const inputPathNames = pathNames.map((name) => aliases[name] ?? name);
  const signatureType = requestType(metadata, aggregate);
  const summary = (contractOperation.summary ?? contractOperation.description ?? "").split("\n")[0].trim();
  const lines: string[] = [];

  if (summary) lines.push(`  /** ${summary.replaceAll("*/", "*\\/")} */`);

  if (pathNames.length || (hasBody && hasQuery)) {
    const destructured = [...inputPathNames, "...params"].join(", ");
    lines.push(`  async ${methodName}({ ${destructured} }: ${signatureType}) {`);
  } else if (hasBody) {
    lines.push(`  async ${methodName}(params: Body<${quote(metadata.path)}, ${quote(metadata.method)}>) {`);
  } else if (hasQuery) {
    lines.push(`  async ${methodName}(params: Query<${quote(metadata.path)}, ${quote(metadata.method)}> = {}) {`);
  } else {
    lines.push(`  async ${methodName}(_params: EmptyParams = {}) {`);
  }

  const options: string[] = [];
  const requestParams: string[] = [];
  if (pathNames.length) {
    const properties = pathNames.map((name, index) => {
      const input = inputPathNames[index];
      return input === name ? name : `${name}: ${input}`;
    });
    requestParams.push(`path: { ${properties.join(", ")} }`);
  }
  if (hasQuery) requestParams.push("query: params");
  if (requestParams.length) options.push(`params: { ${requestParams.join(", ")} }`);
  if (hasBody) {
    const bodyValue = pathNames.length || hasQuery
      ? `params as Body<${quote(metadata.path)}, ${quote(metadata.method)}>`
      : "params";
    options.push(`body: ${bodyValue}`);
  }

  const call = `this.raw.${metadata.method.toUpperCase()}(${quote(metadata.path)}${
    options.length ? `, { ${options.join(", ")} }` : ""
  })`;
  lines.push(`    const { data } = await ${call};`);
  lines.push("    return data;");
  lines.push("  }");
  return lines.join("\n");
}

const services = ["Search", "Public", "Listing", "Restricted", "Order", "Buyer"];

function renderClass(name: string, classOperations: ClientOperation[], aggregate = false) {
  const serviceNames = new Set(services.map((service) => service.toLowerCase()));
  const methods = classOperations
    .filter((operation) => !aggregate || !serviceNames.has(operation.aggregateName ?? operation.name))
    .map((operation) => renderMethod(operation, aggregate))
    .join("\n\n");
  const serviceMembers = aggregate ? `
${services.map((service) => `  readonly ${service.toLowerCase()}: Tradera${service}Client;`).join("\n")}

  constructor(config: TraderaClientConfig) {
    super(config);
${services.map((service) => `    this.${service.toLowerCase()} = new Tradera${service}Client(config, this.raw);`).join("\n")}
  }

` : "";
  return `export class ${name} extends BaseTraderaClient {\n${serviceMembers}${methods}\n}`;
}

const output = `/* eslint-disable */
/* This file is generated by scripts/generate-client.ts. Do not edit it directly. */

import { BaseTraderaClient, type TraderaClientConfig } from "../../client.js";
import type { paths } from "./schema.js";

type EmptyParams = Record<string, never>;
type Operation<Path extends keyof paths, Method extends keyof paths[Path]> = NonNullable<paths[Path][Method]>;
type ObjectOrEmpty<Value> = [Value] extends [never] ? {} : Value extends object ? Value : {};
type PathParams<Path extends keyof paths, Method extends keyof paths[Path]> = Operation<Path, Method> extends { parameters: { path: infer Params } } ? ObjectOrEmpty<Params> : {};
type Query<Path extends keyof paths, Method extends keyof paths[Path]> = Operation<Path, Method> extends { parameters: { query?: infer Params } } ? ObjectOrEmpty<Params> : {};
type Body<Path extends keyof paths, Method extends keyof paths[Path]> = Operation<Path, Method> extends { requestBody?: { content: { "application/json": infer RequestBody } } } ? ObjectOrEmpty<RequestBody> : {};
type Request<Path extends keyof paths, Method extends keyof paths[Path]> = PathParams<Path, Method> & Query<Path, Method> & Body<Path, Method>;

${renderClass("TraderaClient", operations, true)}

${services.map((service) => renderClass(`Tradera${service}Client`, operations.filter((operation) => operation.service === service))).join("\n\n")}

export function createTraderaClient(config: TraderaClientConfig): TraderaClient {
  return new TraderaClient(config);
}
`;

await writeFile(clientPath, output);
console.log(`Generated ${contractOperations.length} operations in ${clientPath}`);
