import { parseAndGenerate } from "wsdl-tsclient";
import { writeFileSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";

const __dirname = import.meta.dirname;

const SERVICES = [
  { name: "search", url: "http://api.tradera.com/v3/SearchService.asmx?WSDL" },
  { name: "public", url: "http://api.tradera.com/v3/PublicService.asmx?WSDL" }
];
const TEMP_WSDL = resolve(__dirname, "./sources");
const OUT_DIR = resolve(__dirname, "../src/generated");

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
      // Cleanup temporary file
      unlinkSync(fileName);
    }
  } catch (error) {
    console.error("❌ Generation failed:", error);
  }
}

generate();