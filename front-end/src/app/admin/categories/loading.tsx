import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesLoading() {
  return (
    <div aria-busy="true" aria-label="Carregando">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-16 bg-white/8" />
          <Skeleton className="h-8 w-48 bg-white/8" />
          <Skeleton className="h-4 w-40 bg-white/6" />
        </div>
        <Skeleton className="h-9 w-36 bg-white/8" />
      </div>
      <div className="overflow-hidden rounded-xl bg-card ring-1 ring-white/8">
        <Skeleton className="h-10 rounded-none bg-white/3" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-6 border-t border-white/6 px-5 py-4">
            <Skeleton className="h-3 w-8 bg-white/8" />
            <Skeleton className="h-4 flex-1 bg-white/8" />
            <Skeleton className="h-6 w-8 bg-white/8" />
            <Skeleton className="hidden h-4 w-28 bg-white/6 md:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
