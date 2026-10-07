import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Play } from "lucide-react";
import { EpisodeWatchingArray } from "@/schemas/episodeSchema";

type SlideProps = {
  episodes: EpisodeWatchingArray;
};

export default function SlideWhatingEpisodes({ episodes }: SlideProps) {
  return (
    <div className="container m-auto p-4">
      {episodes.length === 0 ? (
        <></>
      ) : (
        <Carousel opts={{ align: "start" }}>
          <CarouselContent>
            {episodes.map((e) => (
              <CarouselItem
                key={e.id}
                className="basis-full cursor-pointer sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Link
                  href={`/courses/${e.course.id}/episodes/${e.id}`}
                  className="group mt-8 block"
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-muted ring-1 ring-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/50 group-hover:ring-2 group-hover:ring-primary/70">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASEURL}/${e.course.thumbnailUrl}`}
                      alt={`Capa do curso ${e.name}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex size-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                        <Play
                          className="ml-0.5 size-5 fill-white text-white"
                          strokeWidth={0}
                        />
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 min-h-15.5">
                    <p className="line-clamp-2 font-bold transition-colors group-hover:text-primary">
                      {e.name}
                    </p>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {e.synopsis}
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 border-white/10 bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 hover:text-primary" />
          <CarouselNext className="right-2 border-white/10 bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 hover:text-primary" />
        </Carousel>
      )}
    </div>
  );
}
