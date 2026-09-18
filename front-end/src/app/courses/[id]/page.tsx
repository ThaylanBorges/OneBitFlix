import { SectionButtonsReact } from "@/components/course/SectionButtonsReact";
import HeaderAuth from "@/components/home/HeaderAuth";
import { SidebarEpisodes } from "@/components/SidebarEpisodes";
import { Button } from "@/components/ui/button";
import { courseService } from "@/services/courseService";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_BASEURL;

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const course = await courseService.getById(Number(id));

  if (!course) redirect("/home");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-black">
      <div className="relative z-20 shrink-0 bg-black">
        <HeaderAuth />
      </div>

      <div className="relative flex min-h-0 flex-1">
        <div className="relative flex-1 overflow-hidden">
          <Image
            src={`${apiUrl}/${course.thumbnailUrl}`}
            alt={`Thumbnail do curso ${course.name}`}
            className="object-cover object-center"
            fill
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          <div className="container mx-auto relative z-10 flex h-full gap-5 flex-col justify-center p-4 text-white">
            {course.category && (
              <span className="mb-4 w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur-sm">
                {course.category.name}
              </span>
            )}

            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
              {course.name}
            </h1>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70 lg:text-lg">
              {course.synopsis}
            </p>

            {course.episodes?.length > 0 && (
              <p className="text-sm text-white/40">
                {course.episodes.length}{" "}
                {course.episodes.length === 1 ? "episódio" : "episódios"}{" "}
                disponíveis
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              {course.episodes.length > 0 && (
                <Button
                  render={
                    <Link
                      href={`/courses/${course.id}/episodes/${course.episodes[0].id}`}
                    />
                  }
                  nativeButton={false}
                  variant="ghost"
                  size="xl"
                  className="inline-flex items-center gap-3 rounded-xl border-2 border-white font-bold transition-all duration-150 hover:scale-105 hover:border-primary hover:text-primary"
                >
                  Comece Aqui!
                  <Image
                    src="/buttonPlay.svg"
                    alt=""
                    aria-hidden="true"
                    width={15}
                    height={15}
                  />
                </Button>
              )}

              <div className="flex items-center gap-2">
                <SectionButtonsReact
                  favorited={course.favorited}
                  liked={course.liked}
                  courseId={course.id}
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="relative translate-x-0">
          <SidebarEpisodes id={id} />
        </aside>
      </div>
    </div>
  );
}
