import { SidebarEpisodes } from "@/components/SidebarEpisodes";
import { courseService } from "@/services/courseService";
import { redirect } from "next/navigation";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeaderAuth from "@/components/home/HeaderAuth";
import { formatDuration } from "@/utils/formatDuration";

const apiUrl = process.env.NEXT_PUBLIC_BASEURL;

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ episodeId: string; id: string }>;
}) {
  const { episodeId, id } = await params;

  const course = await courseService.getById(Number(id));
  if (!course) redirect("/home");

  const episodeIndex = course.episodes.findIndex(
    (ep) => ep.id === Number(episodeId),
  );

  const episode = episodeIndex !== -1 ? course.episodes[episodeIndex] : null;

  if (!episode) redirect(`/courses/${id}`);

  const prevEpisode = course.episodes[episodeIndex - 1] ?? null;
  const nextEpisode = course.episodes[episodeIndex + 1] ?? null;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-black text-white">
      <div className="relative z-20 shrink-0 bg-black">
        <HeaderAuth />
      </div>

      <div className="flex min-h-0 flex-1">
        <main className="flex flex-1 flex-col overflow-y-auto">
          <div className="px-8 pt-8 flex justify-center">
            <div className="w-full max-w-[80%] overflow-hidden rounded-2xl bg-white/5 shadow-2xl shadow-black/60">
              <div className="aspect-video w-full">
                <video
                  key={episode.id}
                  controls
                  className="h-full w-full object-cover"
                  poster={
                    course.thumbnailUrl
                      ? `${apiUrl}/${course.thumbnailUrl}`
                      : undefined
                  }
                >
                  <source src={episode.videoUrl} type="video/mp4" />
                  Seu navegador não suporta vídeo HTML5.
                </video>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6 px-8 py-6">
            <div className="flex w-full max-w-[80%] flex-col gap-6">
              <div className="flex flex-wrap items-center  gap-3">
                <Badge
                  variant="outline"
                  className="border-white/20 bg-white/5 text-white/50 text-xs font-medium"
                >
                  Ep. {String(episode.order).padStart(2, "0")}
                </Badge>

                {episode.secondsLong && (
                  <span className="flex items-center gap-1.5 text-xs text-white/30">
                    <Clock className="h-3.5 w-3.5" />
                    {formatDuration(episode.secondsLong)}
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold leading-snug tracking-tight lg:text-3xl">
                {episode.name}
              </h1>

              {episode.synopsis && (
                <p className="max-w-2xl text-sm leading-relaxed text-white/50 lg:text-base">
                  {episode.synopsis}
                </p>
              )}

              <div className="border-t border-white/8" />

              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  {prevEpisode ? (
                    <Link
                      href={`/courses/${id}/episodes/${prevEpisode.id}`}
                      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all hover:border-white/20 hover:bg-white/10"
                    >
                      <ChevronLeft className="h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-white/70" />
                      <div className="min-w-0">
                        <p className="text-xs text-white/30">Anterior</p>
                        <p className="line-clamp-1 text-sm font-medium text-white/60 transition-colors group-hover:text-white">
                          {prevEpisode.name}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 border border-white/10 text-white/40 hover:border-white/20 hover:text-white/80"
                >
                  <Link href={`/courses/${id}`}>Ver curso</Link>
                </Button>

                <div className="flex flex-1 justify-end">
                  {nextEpisode ? (
                    <Link
                      href={`/courses/${id}/episodes/${nextEpisode.id}`}
                      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all hover:border-white/20 hover:bg-white/10"
                    >
                      <div className="min-w-0 text-right">
                        <p className="text-xs text-white/30">Próximo</p>
                        <p className="line-clamp-1 text-sm font-medium text-white/60 transition-colors group-hover:text-white">
                          {nextEpisode.name}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-white/70" />
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className="relative  translate-x-0">
          <SidebarEpisodes id={id} />
        </aside>
      </div>
    </div>
  );
}
