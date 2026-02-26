import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const STORAGE_DIR = process.env.STORAGE_DIR || path.join(process.cwd(), "storage");

// Ensure storage directory exists
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

export interface StorageResult {
  path: string;
  url: string;
}

export async function storeAsset(
  buffer: Buffer,
  format: string,
  prefix?: string
): Promise<StorageResult> {
  const filename = `${prefix ? prefix + "-" : ""}${uuid()}.${format}`;
  const filePath = path.join(STORAGE_DIR, filename);

  fs.writeFileSync(filePath, buffer);

  // In production, this would return an R2/S3 URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}/api/assets/${filename}/download`;

  return { path: filePath, url };
}

export function getAssetBuffer(storagePath: string): Buffer | null {
  if (fs.existsSync(storagePath)) {
    return fs.readFileSync(storagePath);
  }
  return null;
}

export function getAssetByFilename(filename: string): Buffer | null {
  const filePath = path.join(STORAGE_DIR, filename);
  return getAssetBuffer(filePath);
}
