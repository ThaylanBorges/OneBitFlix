import { episodeService } from "@/services/episodeService";
import SlideWhatingEpisodes from "./SlideWhatingEpisodes";
import Animated from "../Animated";
import SectionHeading from "./SectionHeading";

export async function WhatingEpisodesSection() {
  const episodes = await episodeService.getWatching();

  if (!episodes) return null;

  return (
    <>
      {episodes.length > 0 && (
        <div
          id="continueWatching"
          className="container mx-auto mt-16 scroll-mt-8 sm:mt-20"
        >
          <Animated type="fadeUp">
            <SectionHeading
              title="Continuar Assistindo"
              description="Não perca tempo e volte de onde parou"
            />
          </Animated>
          <SlideWhatingEpisodes episodes={episodes} />
        </div>
      )}
    </>
  );
}
