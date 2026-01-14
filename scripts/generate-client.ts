import { parseAndGenerate } from "wsdl-tsclient";
import { writeFileSync, unlinkSync, readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const __dirname = import.meta.dirname;

const SERVICES = [
  { name: "search", url: "https://api.tradera.com/v3/SearchService.asmx?WSDL" },
  { name: "public", url: "https://api.tradera.com/v3/PublicService.asmx?WSDL" },
  { name: "listing", url: "https://api.tradera.com/v3/ListingService.asmx?WSDL" },
  { name: "restricted", url: "https://api.tradera.com/v3/RestrictedService.asmx?WSDL" },
  { name: "order", url: "https://api.tradera.com/v3/OrderService.asmx?WSDL" },
  { name: "buyer", url: "https://api.tradera.com/v3/BuyerService.asmx?WSDL" }
];
const TEMP_WSDL = resolve(__dirname, "./sources");
const OUT_DIR = resolve(__dirname, "../src/generated");

function fixIndexFile(filePath: string): void {
  if (!existsSync(filePath)) {
    console.warn(`⚠️  Index file not found: ${filePath}`);
    return;
  }

  let content = readFileSync(filePath, "utf-8");
  const originalContent = content;
  
  content = content.replace(/export \{/g, "export type {");
  
  if (content !== originalContent) {
    writeFileSync(filePath, content);
    console.log(`✅ Fixed type exports in: ${filePath}`);
  } else {
    console.log(`⚠️  No changes made to: ${filePath}`);
  }
}

function fixClientFile(filePath: string): void {
  if (!existsSync(filePath)) {
    console.warn(`⚠️  Client file not found: ${filePath}`);
    return;
  }

  let content = readFileSync(filePath, "utf-8");
  const originalContent = content;
  
  const interfaceMatch = content.match(/export interface \w+ extends SoapClient \{[\s\S]*?\n\}/);
  if (interfaceMatch) {
    const interfaceContent = interfaceMatch[0];
    const lines = interfaceContent.split('\n');
    const seenMethods = new Set<string>();
    const uniqueLines: string[] = [];
    
    for (const line of lines) {
      const methodMatch = line.match(/^\s+(\w+Async)\(/);
      if (methodMatch) {
        const methodName = methodMatch[1];
        if (seenMethods.has(methodName)) {
          continue;
        }
        seenMethods.add(methodName);
      }
      uniqueLines.push(line);
    }
    
    const newInterface = uniqueLines.join('\n');
    content = content.replace(interfaceMatch[0], newInterface);
  }
  
  if (content !== originalContent) {
    writeFileSync(filePath, content);
    console.log(`✅ Removed duplicate methods from: ${filePath}`);
  } else {
    console.log(`⚠️  No duplicate methods found in: ${filePath}`);
  }
}

async function generate() {
  try {

    for (const service of SERVICES) {
      console.log(`📥 Fetching WSDL for ${service.name}...`);
      const res = await fetch(service.url);

      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const fileName = TEMP_WSDL + "/" + service.name + ".wsdl";
      const wsdlText = await res.text();
      writeFileSync(fileName, wsdlText);
      console.log("✅ WSDL saved locally.");

      console.log("⚙️  Generating TypeScript Client...");
      await parseAndGenerate(fileName, OUT_DIR, {
      });

      console.log(`🚀 Success! Files generated in: ${OUT_DIR}`);
      
      const indexPath = resolve(OUT_DIR, service.name, "index.ts");
      fixIndexFile(indexPath);
      
      const clientPath = resolve(OUT_DIR, service.name, "client.ts");
      fixClientFile(clientPath);
      
      unlinkSync(fileName);
    }
  } catch (error) {
    console.error("❌ Generation failed:", error);
  }
}

generate();