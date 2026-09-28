type SectionHeadingProps = {
  title: string;
  description?: string;
};

export default function SectionHeading({
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-4 px-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <span
        aria-hidden="true"
        className="hidden h-px flex-1 bg-linear-to-r from-white/15 to-transparent sm:block"
      />
    </div>
  );
}
