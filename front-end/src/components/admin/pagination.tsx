import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "cn";

type PaginationProps = {
  basePath: string;
  page: number;
  perPage: number;
  total: number;
};

/** Gera [1, "…", 4, 5, 6, "…", 10] */
function pageList(current: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(totalPages - 1, current + 1);
  if (start > 2) pages.push("…");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < totalPages - 1) pages.push("…");
  pages.push(totalPages);
  return pages;
}

const itemBase =
  "inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-lg px-2 text-sm font-medium tabular-nums transition-colors";

export function Pagination({ basePath, page, perPage, total }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  const href = (p: number) => `${basePath}?page=${p}`;

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-white/8 px-5 py-3 sm:flex-row">
      <p className="text-sm text-muted-foreground">
        Mostrando{" "}
        <span className="font-medium text-white tabular-nums">
          {from}–{to}
        </span>{" "}
        de <span className="font-medium text-white tabular-nums">{total}</span>
      </p>

      {totalPages > 1 && (
        <nav aria-label="Paginação" className="flex items-center gap-1">
          {page > 1 ? (
            <Link
              href={href(page - 1)}
              className={cn(itemBase, "text-white/70 hover:bg-white/6 hover:text-white")}
            >
              <ChevronLeft className="size-4" />
              <span className="hidden sm:inline">Anterior</span>
            </Link>
          ) : (
            <span aria-disabled="true" className={cn(itemBase, "text-white/25")}>
              <ChevronLeft className="size-4" />
              <span className="hidden sm:inline">Anterior</span>
            </span>
          )}

          {pageList(page, totalPages).map((p, i) =>
            p === "…" ? (
              <span key={`gap-${i}`} className={cn(itemBase, "text-white/30")}>
                …
              </span>
            ) : (
              <Link
                key={p}
                href={href(p)}
                aria-current={p === page ? "page" : undefined}
                className={cn(
                  itemBase,
                  p === page
                    ? "bg-primary text-primary-foreground"
                    : "text-white/70 hover:bg-white/6 hover:text-white",
                )}
              >
                {p}
              </Link>
            ),
          )}

          {page < totalPages ? (
            <Link
              href={href(page + 1)}
              className={cn(itemBase, "text-white/70 hover:bg-white/6 hover:text-white")}
            >
              <span className="hidden sm:inline">Próxima</span>
              <ChevronRight className="size-4" />
            </Link>
          ) : (
            <span aria-disabled="true" className={cn(itemBase, "text-white/25")}>
              <span className="hidden sm:inline">Próxima</span>
              <ChevronRight className="size-4" />
            </span>
          )}
        </nav>
      )}
    </div>
  );
}
