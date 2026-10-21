import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "../config/env.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

export const storageService = {
  getVideoUrl: (key: string, expiresIn: number) => {
    return getSignedUrl(
      s3,
      new GetObjectCommand({ Bucket: env.R2_BUCKET, Key: key }),
      { expiresIn },
    );
  },
};
