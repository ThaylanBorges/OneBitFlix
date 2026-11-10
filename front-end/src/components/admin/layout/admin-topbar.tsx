"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Fragment } from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { adminNav } from "./admin-nav";

type Crumb = { label: string; href?: string };

const SEGMENT_LABELS: Record<string, string> = {
  new: "Novo",
  edit: "Editar",
};

function buildCrumbs(pathname: string): Crumb[] {
  const segments = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  // segments[0] === "admin"
  const crumbs: Crumb[] = [{ label: "Admin", href: "/admin" }];

  if (segments.length <= 1) {
    crumbs.push({ label: "Dashboard" });
    return crumbs;
  }

  let href = "/admin";
  segments.slice(1).forEach((segment) => {
    href += `/${segment}`;
    const navItem = adminNav
      .flatMap((g) => g.items)
      .find((item) => item.href === href);

    const label =
      navItem?.title ??
      SEGMENT_LABELS[segment] ??
      (/^\d+$/.test(segment) ? `#${segment}` : segment);

    crumbs.push({ label, href });
  });

  // o último item não é link
  delete crumbs[crumbs.length - 1].href;
  return crumbs;
}

export function AdminTopbar() {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-white/8 bg-background/80 px-4 backdrop-blur-md md:px-6">
      <SidebarTrigger className="-ml-1 text-white/70 hover:text-white" />
      <Separator orientation="vertical" className="my-4 bg-white/10" />

      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="flex items-center gap-1.5 text-sm">
          {crumbs.map((crumb, index) => (
            <Fragment key={`${crumb.label}-${index}`}>
              {index > 0 && (
                <ChevronRight
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-white/30"
                />
              )}
              <li className="truncate">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-muted-foreground transition-colors hover:text-white"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-white">
                    {crumb.label}
                  </span>
                )}
              </li>
            </Fragment>
          ))}
        </ol>
      </nav>
    </header>
  );
}
