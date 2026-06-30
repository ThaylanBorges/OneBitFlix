import { FeatureType, ResourceOptions } from "adminjs";
import { componentLoader } from "../component-loader.js";
import uploadFileFeature from "@adminjs/upload";
import {
  ALLOWED_IMAGE_MIMES,
  MAX_IMAGE_SIZE,
  PUBLIC_DIR,
} from "../constants.js";

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

export const courseResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    componentLoader,
    provider: {
      local: {
        bucket: PUBLIC_DIR,
        opts: {
          baseUrl: "/public",
        },
      },
    },
    properties: {
      key: "thumbnailUrl",
      file: "uploadThumbnail",
    },
    validation: {
      mimeTypes: ALLOWED_IMAGE_MIMES,
      maxSize: MAX_IMAGE_SIZE,
    },
    uploadPath: (record, filename) =>
      `thumbnails/course-${record.id()}/${filename}`,
  }),
];
