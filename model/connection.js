import Database from "better-sqlite3";
import "dotenv/config";
import path from "path";
import { join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = new Database(process.env.NODE_ENV == "development" ? "./electron/data.db" : join(process.resourcesPath, "./electron/data.db"));
