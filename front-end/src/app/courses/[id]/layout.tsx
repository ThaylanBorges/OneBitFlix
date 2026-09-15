import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { SidebarEpisodes } from "@/components/SidebarEpisodes";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { id } = await params;

  return (
    <SidebarProvider>
      <main className="flex-1">{children}</main>
      <SidebarEpisodes id={id} />
    </SidebarProvider>
  );
}
