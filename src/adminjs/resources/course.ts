import { FeatureType, ResourceOptions } from "adminjs";
import { componentLoader } from "../component-loader.js";
import uploadFileFeature from "@adminjs/upload";
import path from "node:path";

export const courseResourceOptions: ResourceOptions = {
  navigation: "Catalogo",
  editProperties: [
    "name",
    "synopsis",
    "uploadThumbnail",
    "featured",
    "categoryId",
  ],
  filterProperties: [
    "name",
    "synopsis",
    "featured",
    "categoryId",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["id", "name", "featured", "categoryId"],
  showProperties: [
    "id",
    "name",
    "synopsis",
    "featured",
    "thumbnailUrl",
    "categoryId",
    "createdAt",
    "updatedAt",
  ],
};

const UPLOAD_DIR = path.join(process.cwd(), "public");

export const courseResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    componentLoader,
    provider: {
      local: {
        bucket: UPLOAD_DIR,
        opts: {
          baseUrl: "/public",
        },
      },
    },
    properties: {
      key: "thumbnailUrl",
      file: "uploadThumbnail",
    },

    uploadPath: (record, filename) =>
      `thumbnails/course-${record.id()}/${filename}`,
  }),
];
