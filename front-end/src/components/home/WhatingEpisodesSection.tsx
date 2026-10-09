import { episodeService } from "@/services/episodeService";
import SlideWhatingEpisodes from "./SlideWhatingEpisodes";

export async function WhatingEpisodesSection() {
  const episodes = await episodeService.getWatching();

  if (!episodes) return;

  return <SlideWhatingEpisodes episodes={episodes} />;
}
