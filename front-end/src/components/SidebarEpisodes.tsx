import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { courseService } from "@/services/courseService";
import { redirect } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { formatDuration } from "@/utils/formatDuration";
import { Play } from "lucide-react";

export async function SidebarEpisodes({
  id,
  episodeId,
}: {
  id: string;
  episodeId?: number;
}) {
  const course = await courseService.getById(Number(id));

  if (!course) redirect("/home");

  return (
    <div>
      <Sidebar
        side="right"
        style={{ "--sidebar-width": "340px" } as React.CSSProperties}
        className="border-l border-white/10 bg-black/95 "
      >
        <SidebarHeader className="border-b border-white/10 px-5 py-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Episódios
            </h3>
          </div>
        </SidebarHeader>

        <ScrollArea className="min-h-0 flex-1">
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu className="gap-0 py-2">
                {course.episodes.map((episode, index) => (
                  <SidebarMenuItem key={episode.id}>
                    <SidebarMenuButton className="group h-auto w-full rounded-none px-5 py-4">
                      <Link
                        href={`/courses/${course.id}/episodes/${episode.id}`}
                        className="group/item flex w-full items-start gap-4 px-5 py-4 transition-colors "
                      >
                        {episode.id === episodeId ? (
                          <span className="mt-0.5 flex h-6 items-center justify-center text-primary transition-colors">
                            <Play className="shrink-0" />
                          </span>
                        ) : (
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-white/40 transition-colors group-hover/item:border-primary group-hover/item:text-primary">
                            {index + 1}
                          </span>
                        )}

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-medium leading-snug text-white/70 transition-colors group-hover/item:text-white">
                            {episode.name}
                          </p>
                          {episode.secondsLong && (
                            <span className="flex items-center gap-1.5 text-xs text-white/30">
                              {formatDuration(episode.secondsLong)}
                            </span>
                          )}
                        </div>
                      </Link>
                    </SidebarMenuButton>

                    {index < course.episodes.length - 1 && (
                      <div className="mx-5 border-b border-white/5" />
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </ScrollArea>
      </Sidebar>
      <SidebarTrigger
        className="
              absolute top-6 right-6 z-20
              transition-all hover:scale-105
            "
      />
    </div>
  );
}
