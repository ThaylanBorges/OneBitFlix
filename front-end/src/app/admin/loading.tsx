import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div aria-busy="true" aria-label="Carregando">
      <div className="mb-8 space-y-2">
        <Skeleton className="h-3 w-24 bg-white/8" />
        <Skeleton className="h-8 w-64 bg-white/8" />
        <Skeleton className="h-4 w-80 bg-white/6" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-36 rounded-xl bg-card" />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Skeleton className="h-80 rounded-xl bg-card lg:col-span-2" />
        <Skeleton className="h-80 rounded-xl bg-card" />
      </div>
    </div>
  );
}
