import fs from "node:fs";
import path from "node:path";
import type { Express } from "express";
import { env } from "../config/env.js";

const uploadRoot = path.resolve(process.cwd(), env.UPLOAD_DIR);

if (!fs.existsSync(uploadRoot)) {
  fs.mkdirSync(uploadRoot, { recursive: true });
}

export interface StorageAdapter {
  upload(file: Express.Multer.File): Promise<string>;
}

class LocalStorageAdapter implements StorageAdapter {
  async upload(file: Express.Multer.File) {
    return `/${env.UPLOAD_DIR}/${file.filename}`;
  }
}

export const storageAdapter: StorageAdapter = new LocalStorageAdapter();
