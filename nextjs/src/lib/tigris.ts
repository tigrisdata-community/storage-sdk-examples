import { list, get, put, head, remove } from "@tigrisdata/storage";

if (
  !process.env.NEXT_PUBLIC_TIGRIS_STORAGE_ACCESS_KEY_ID ||
  !process.env.NEXT_PUBLIC_TIGRIS_STORAGE_SECRET_ACCESS_KEY ||
  !process.env.NEXT_PUBLIC_TIGRIS_STORAGE_ENDPOINT ||
  !process.env.NEXT_PUBLIC_TIGRIS_STORAGE_BUCKET
) {
  throw new Error(
    "Missing required Tigris configuration environment variables"
  );
}

export const config = {
  bucket: process.env.NEXT_PUBLIC_TIGRIS_STORAGE_BUCKET,
  accessKeyId: process.env.NEXT_PUBLIC_TIGRIS_STORAGE_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_TIGRIS_STORAGE_SECRET_ACCESS_KEY,
  endpoint: process.env.NEXT_PUBLIC_TIGRIS_STORAGE_ENDPOINT,
};

export { list, get, put, head, remove };
