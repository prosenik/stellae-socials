import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

let initialized = false;

export function ensureDb() {
  if (initialized) return;
  
  const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), "data", "stellae.db");
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const sqlite = new Database(dbPath);
  sqlite.pragma("journal_mode = WAL");

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS brands (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      config TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS templates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL,
      variable_schema TEXT NOT NULL,
      renderer_type TEXT NOT NULL DEFAULT 'satori',
      thumbnail_url TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS assets (
      id TEXT PRIMARY KEY,
      template_id TEXT NOT NULL,
      brand_id TEXT NOT NULL,
      platform TEXT NOT NULL,
      format TEXT NOT NULL DEFAULT 'png',
      width INTEGER NOT NULL,
      height INTEGER NOT NULL,
      storage_path TEXT NOT NULL,
      url TEXT,
      variables TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      status TEXT NOT NULL DEFAULT 'pending',
      template_id TEXT NOT NULL,
      brand_id TEXT NOT NULL,
      platforms TEXT NOT NULL,
      variables TEXT NOT NULL,
      result TEXT,
      error TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      completed_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS api_keys (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      key_hash TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      last_used_at INTEGER
    );
  `);
  sqlite.close();
  initialized = true;
}
