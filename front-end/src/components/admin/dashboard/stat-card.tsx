import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "cn";

type StatCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  hint?: string;
  href?: string;
  /** destaca o card com a cor primária */
  highlight?: boolean;
};

const numberFormatter = new Intl.NumberFormat("pt-BR");

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  href,
  highlight,
}: StatCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex size-10 items-center justify-center rounded-lg ring-1",
            highlight
              ? "bg-primary/15 text-primary ring-primary/25"
              : "bg-white/5 text-white/80 ring-white/10",
          )}
        >
          <Icon className="size-5" />
        </span>
        {href && (
          <ArrowUpRight className="size-4 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        )}
      </div>

      <div className="mt-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight tabular-nums">
          {numberFormatter.format(value)}
        </p>
        {hint && <p className="mt-1.5 text-xs text-white/45">{hint}</p>}
      </div>
    </>
  );

  const className = cn(
    "group relative overflow-hidden rounded-xl bg-card p-5 ring-1 ring-white/8 transition-all",
    highlight &&
      "bg-[radial-gradient(120%_120%_at_100%_0%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_60%),var(--card)]",
    href && "hover:-translate-y-0.5 hover:ring-primary/40",
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
