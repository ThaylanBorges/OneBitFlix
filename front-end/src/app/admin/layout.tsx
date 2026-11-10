import { cookies } from "next/headers";
import React from "react";

import { AdminSidebar } from "@/components/admin/layout/admin-sidebar";
import { AdminTopbar } from "@/components/admin/layout/admin-topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { requireAdmin } from "@/utils/requireAdmin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  // Mantém a sidebar aberta/fechada entre recarregamentos (cookie gravado pelo SidebarProvider)
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    // data-admin-shell ativa as cores do painel definidas em globals.css
    <SidebarProvider defaultOpen={defaultOpen} data-admin-shell="">
      <AdminSidebar
        user={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }}
      />
      <SidebarInset className="min-w-0 bg-background">
        <AdminTopbar />
        <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-8 md:py-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
