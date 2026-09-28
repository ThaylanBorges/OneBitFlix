export default function CoursesSlideSkeleton() {
  return (
    <div className="container m-auto p-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="mt-8">
            <div className="aspect-video animate-pulse rounded-xl bg-muted" />
            <div className="mt-3 space-y-2">
              <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
              <div className="h-3 w-3/5 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
