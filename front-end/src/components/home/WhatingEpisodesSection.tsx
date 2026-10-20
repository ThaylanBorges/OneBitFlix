import { episodeService } from "@/services/episodeService";
import SlideWhatingEpisodes from "../slide/SlideWhatingEpisodes";

export async function WhatingEpisodesSection() {
  const episodes = await episodeService.getWatching();

  return (
    <SlideWhatingEpisodes
      episodes={episodes}
      emptyMessage="Você ainda não começou nenhum episódio."
    />
  );
}
