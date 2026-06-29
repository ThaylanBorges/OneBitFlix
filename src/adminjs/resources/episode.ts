import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "node:path";
import { componentLoader } from "../component-loader.js";

export const episodeResourceOptions: ResourceOptions = {
  navigation: "Catalogo",
  editProperties: [
    "name",
    "synopsis",
    "courseId",
    "order",
    "uploadVideo",
    "secondsLong",
  ],
  filterProperties: [
    "name",
    "synopsis",
    "courseId",
    "secondsLong",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["id", "name", "courseId", "order", "secondsLong"],
  showProperties: [
    "id",
    "name",
    "synopsis",
    "courseId",
    "order",
    "videoUrl",
    "secondsLong",
    "createdAt",
    "updatedAt",
  ],
};

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

export const episodeResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    componentLoader,
    provider: {
      local: {
        bucket: UPLOAD_DIR,
        opts: {
          baseUrl: "/uploads",
        },
      },
    },
    properties: {
      key: "videoUrl",
      file: "uploadVideo",
    },
    uploadPath: (record, filename) =>
      `videos/course-${record.params.courseId}/${filename}`,
  }),
];
