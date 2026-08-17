/**
 * Upload all images from public/images (and public/images/photos) to Cloudflare R2,
 * then update every imagePath in the project_images DB table to the R2 CDN URL.
 *
 * Run: npx tsx scripts/upload-to-r2.ts
 */
import * as fs from "fs";
import * as path from "path";
import * as mime from "mime-types";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";

// ── Config ────────────────────────────────────────────────────────────────────
const ACCOUNT_ID   = process.env.R2_ACCOUNT_ID!;
const ACCESS_KEY   = process.env.R2_ACCESS_KEY_ID!;
const SECRET_KEY   = process.env.R2_SECRET_ACCESS_KEY!;
const BUCKET       = process.env.R2_BUCKET_NAME!;
const ENDPOINT     = process.env.R2_ENDPOINT!;
const PUBLIC_URL   = (process.env.R2_PUBLIC_URL!).replace(/\/$/, "");

const IMAGES_DIR   = path.join(__dirname, "../public/images");
const PHOTOS_DIR   = path.join(IMAGES_DIR, "photos");

// ── R2 client ────────────────────────────────────────────────────────────────
const s3 = new S3Client({
  region: "auto",
  endpoint: ENDPOINT,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
});

const prisma = new PrismaClient();

// ── Helpers ───────────────────────────────────────────────────────────────────
function getMime(filePath: string): string {
  return mime.lookup(filePath) as string || "application/octet-stream";
}

/** Returns true if the key already exists in R2 (skip re-upload) */
async function existsInR2(key: string): Promise<boolean> {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}

/** Upload a single file. Key is e.g. "images/img42.jpeg" or "images/photos/foo.jpg" */
async function uploadFile(localPath: string, key: string): Promise<string> {
  const alreadyExists = await existsInR2(key);
  if (alreadyExists) {
    const url = `${PUBLIC_URL}/${key}`;
    process.stdout.write(`  ⏩ skip  ${key}\n`);
    return url;
  }

  const body = fs.readFileSync(localPath);
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: getMime(localPath),
    CacheControl: "public, max-age=31536000, immutable",
  }));

  const url = `${PUBLIC_URL}/${key}`;
  process.stdout.write(`  ✅ uploaded  ${key}\n`);
  return url;
}

// ── Collect all files ─────────────────────────────────────────────────────────
function collectFiles(): Array<{ localPath: string; r2Key: string }> {
  const files: Array<{ localPath: string; r2Key: string }> = [];

  // Root-level images (skip the photos subdirectory entry itself)
  for (const fname of fs.readdirSync(IMAGES_DIR)) {
    const fullPath = path.join(IMAGES_DIR, fname);
    if (fs.statSync(fullPath).isDirectory()) continue; // skip photos/
    files.push({ localPath: fullPath, r2Key: `images/${fname}` });
  }

  // photos/ subdirectory
  if (fs.existsSync(PHOTOS_DIR)) {
    for (const fname of fs.readdirSync(PHOTOS_DIR)) {
      const fullPath = path.join(PHOTOS_DIR, fname);
      if (fs.statSync(fullPath).isFile()) {
        files.push({ localPath: fullPath, r2Key: `images/photos/${fname}` });
      }
    }
  }

  return files;
}

// ── Build old-path → R2 URL mapping ──────────────────────────────────────────
// Old paths in DB look like:  /images/img42.jpeg
// New R2 URL:                 https://pub-xxx.r2.dev/images/img42.jpeg
function oldPathToR2Url(oldPath: string): string {
  // Strip leading slash, prepend public URL
  return `${PUBLIC_URL}/${oldPath.replace(/^\//, "")}`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n🚀  Starting Cloudflare R2 migration\n");
  console.log(`   Bucket  : ${BUCKET}`);
  console.log(`   Endpoint: ${ENDPOINT}`);
  console.log(`   CDN     : ${PUBLIC_URL}\n`);

  // 1. Upload all files
  const files = collectFiles();
  console.log(`📁  Found ${files.length} files to upload\n`);

  let uploaded = 0, skipped = 0, failed = 0;
  for (const { localPath, r2Key } of files) {
    try {
      const url = await uploadFile(localPath, r2Key);
      if (url && !url.includes("skip")) uploaded++;
      else skipped++;
    } catch (err) {
      console.error(`  ❌ FAILED  ${r2Key}: ${(err as Error).message}`);
      failed++;
    }
  }

  // Re-count: existsInR2 path writes "skip" to stdout but still returns url
  console.log(`\n📊  Upload complete: ${files.length} files processed, ${failed} failed\n`);

  // 2. Update DB — project_images table
  console.log("🗄   Updating project_images in DB...\n");

  const allImages = await prisma.projectImage.findMany();
  console.log(`   Found ${allImages.length} rows in project_images`);

  let dbUpdated = 0;
  for (const img of allImages) {
    const oldPath = img.imagePath;

    // Already a CDN URL — skip
    if (oldPath.startsWith("http")) {
      process.stdout.write(`  ⏩ skip  id=${img.id} (already CDN)\n`);
      continue;
    }

    const newUrl = oldPathToR2Url(oldPath);
    await prisma.projectImage.update({
      where: { id: img.id },
      data: { imagePath: newUrl },
    });
    process.stdout.write(`  ✅ db    id=${img.id}  ${oldPath}  →  ${newUrl}\n`);
    dbUpdated++;
  }

  console.log(`\n✅  DB updated: ${dbUpdated} rows patched\n`);

  // 3. Summary
  console.log("─".repeat(60));
  console.log("Migration complete!\n");
  console.log(`  Files uploaded/skipped : ${files.length}`);
  console.log(`  DB rows updated        : ${dbUpdated}`);
  console.log(`  Failures               : ${failed}`);
  console.log("─".repeat(60) + "\n");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("\n💥  Fatal error:", e);
  prisma.$disconnect();
  process.exit(1);
});
