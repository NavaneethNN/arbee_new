import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// ── R2 client singleton ───────────────────────────────────────────────────────
const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME ?? "arbee";
const PUBLIC_URL = (process.env.R2_PUBLIC_URL ?? "").replace(/\/$/, "");

/** CDN base — used to build full URLs from R2 keys */
export const R2_CDN = PUBLIC_URL;

/**
 * Upload a file buffer to R2.
 * @param key      R2 object key, e.g. "images/img42.jpeg"
 * @param body     File contents as Buffer
 * @param mimeType e.g. "image/jpeg"
 * @returns        Full public CDN URL
 */
export async function uploadToR2(
  key: string,
  body: Buffer,
  mimeType: string
): Promise<string> {
  await r2Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: mimeType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
  return `${PUBLIC_URL}/${key}`;
}

/**
 * Delete an object from R2 by its CDN URL or key.
 */
export async function deleteFromR2(urlOrKey: string): Promise<void> {
  const key = urlOrKey.startsWith("http")
    ? urlOrKey.replace(`${PUBLIC_URL}/`, "")
    : urlOrKey;
  await r2Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

/**
 * Convert a local /images/xxx.jpg path to its R2 CDN URL.
 * If it's already a full URL, return as-is.
 */
export function toR2Url(path: string): string {
  if (path.startsWith("http")) return path;
  return `${PUBLIC_URL}/${path.replace(/^\//, "")}`;
}

/**
 * Build a unique R2 key for an uploaded file.
 * e.g. "images/upload-1721234567890-abc123.jpg"
 */
export function buildUploadKey(originalName: string): string {
  const ext = originalName.split(".").pop()?.toLowerCase() ?? "jpg";
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `images/upload-${stamp}.${ext}`;
}
