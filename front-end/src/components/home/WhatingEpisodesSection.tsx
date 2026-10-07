import { episodeService } from "@/services/episodeService";
import SlideWhatingEpisodes from "./SlideWhatingEpisodes";

export async function WhatingEpisodesSection() {
  const episodes = await episodeService.getWating();

  if (!episodes) return;

  return <SlideWhatingEpisodes episodes={episodes} />;
}
