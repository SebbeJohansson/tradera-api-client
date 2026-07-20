import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

interface OpenApiDocument {
  openapi?: string;
  info?: {
    title?: string;
  };
}

const CONTRACT_URL = "https://api.tradera.com/v4/swagger/v4/swagger.json";
const outputPath = resolve(import.meta.dirname, "../openapi/tradera-v4.json");

const response = await fetch(CONTRACT_URL);
if (!response.ok) {
  throw new Error(`Failed to download Tradera OpenAPI contract: ${response.status}`);
}

const contract = await response.json() as OpenApiDocument;
if (contract.openapi !== "3.0.1" || contract.info?.title !== "Tradera API") {
  throw new Error("Downloaded document is not the expected Tradera OpenAPI contract");
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(contract, null, 2)}\n`);
console.log(`Updated ${outputPath} from ${CONTRACT_URL}`);
