import { requireAdmin } from "@/utils/requireAdmin";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return <main>{children}</main>;
}
