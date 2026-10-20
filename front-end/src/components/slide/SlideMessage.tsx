import { Tv } from "lucide-react";

type SlideMessageProps = {
  message: string;
};

export function SlideMessage({ message }: SlideMessageProps) {
  return (
    <div className="container m-auto p-4">
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-white/10 py-14 text-center text-muted-foreground">
        <Tv className="size-8 text-muted-foreground/70" strokeWidth={1.5} />
        <p className="max-w-sm text-sm">{message}</p>
      </div>
    </div>
  );
}
