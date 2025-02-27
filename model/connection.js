import Database from "better-sqlite3";
import path from "path";
import { join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = new Database(join(process.resourcesPath, "./electron/data.db"));
