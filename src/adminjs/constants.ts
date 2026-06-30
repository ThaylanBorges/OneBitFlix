import fs from "node:fs";
import path from "node:path";

export const UPLOAD_DIR = path.join(process.cwd(), "uploads");
export const PUBLIC_DIR = path.join(process.cwd(), "public");

fs.mkdirSync(UPLOAD_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_DIR, { recursive: true });

export const MAX_VIDEO_SIZE = 1024 * 1024 * 100;
export const MAX_IMAGE_SIZE = 1024 * 1024 * 5;

export const ALLOED_VIDEO_MIMES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

export const ALLOWED_IMAGE_MIMES = ["image/jpeg", "image/png", "image/webp"];
