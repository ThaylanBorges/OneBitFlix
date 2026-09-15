import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { courseService } from "@/services/courseService";
import { Check } from "lucide-react";
import { redirect } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";

const episodes = [
  {
    id: 1,
    name: "Introdução ao curso e configuração do ambiente",
    completed: true,
    current: false,
  },
  {
    id: 2,
    name: "Variáveis, tipos de dados e operadores",
    completed: true,
    current: false,
  },
  {
    id: 3,
    name: "Estruturas condicionais: if, else e switch",
    completed: false,
    current: true,
  },
  {
    id: 4,
    name: "Laços de repetição: for, while e do-while",
    completed: false,
    current: false,
  },
  {
    id: 5,
    name: "Funções e escopo de variáveis",
    completed: false,
    current: false,
  },
];

export async function SidebarEpisodes({ id }: { id: string }) {
  const course = await courseService.getById(Number(id));

  if (!course) redirect("/home");

  return (
    <Sidebar side="right">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Episódios</h3>
        </div>
      </SidebarHeader>

      <ScrollArea className="flex-1 min-h-0">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="gap-5">
              {episodes.map((episode) => (
                <SidebarMenuItem key={episode.id}>
                  <SidebarMenuButton className="gap-3 h-auto whitespace-normal py-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs font-medium">
                      {episode.completed ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        episode.id
                      )}
                    </span>
                    <span className="text-sm leading-snug line-clamp-2">
                      {episode.name}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  );
}
