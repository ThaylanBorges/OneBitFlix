import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import { componentLoader } from "../component-loader.js";
import {
  ALLOED_VIDEO_MIMES,
  MAX_VIDEO_SIZE,
  UPLOAD_DIR,
} from "../constants.js";

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
    validation: {
      mimeTypes: ALLOED_VIDEO_MIMES,
      maxSize: MAX_VIDEO_SIZE,
    },
    uploadPath: (record, filename) =>
      `videos/course-${record.params.courseId}/${filename}`,
  }),
];
