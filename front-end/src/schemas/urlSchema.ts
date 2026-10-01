import { PROTECTED_PREFIXES } from "@/constants/routes";
import z from "zod";

export const internalRouteSchema = z
  .string()
  .refine(
    (route) =>
      PROTECTED_PREFIXES.some(
        (prefix) => route === prefix || route.startsWith(`${prefix}/`),
      ),
    { message: "Invalid internal route." },
  );
