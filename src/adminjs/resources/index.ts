import { ResourceWithOptions } from "adminjs";
import { Category } from "../../models/Category.js";
import { categoryResourceOptions } from "./category.js";
import { Course } from "../../models/Course.js";
import { courseResourceOptions } from "./course.js";
import { Episode } from "../../models/Episodes.js";
import { episodeResourceFeatures, episodeResourceOptions } from "./episode.js";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Category,
    options: categoryResourceOptions,
  },
  {
    resource: Course,
    options: courseResourceOptions,
  },
  {
    resource: Episode,
    options: episodeResourceOptions,
    features: episodeResourceFeatures,
  },
];
