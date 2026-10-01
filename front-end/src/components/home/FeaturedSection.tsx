import { courseService } from "@/services/courseService";
import Image from "next/image";
import HeaderAuth from "./HeaderAuth";
import { Button } from "../ui/button";
import Link from "next/link";
import Animated from "../Animated";

const apiUrl = process.env.NEXT_PUBLIC_BASEURL;

export async function FeaturedSection() {
  const featuredCourses = await courseService.getFeaturedCourses();
  const featured = featuredCourses[0];

  if (!featured) return null;

  return (
    <div className="relative h-[85vh] min-h-140 w-full overflow-hidden sm:h-screen">
      <div className="relative z-20 bg-black">
        <HeaderAuth />
      </div>

      <Image
        src={`${apiUrl}/${featured.thumbnailUrl}`}
        alt={`Foto ${featured.name}`}
        fill
        preload
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />

      <div className="absolute inset-0 z-10 flex items-center">
        <Animated type="fadeUp" className="container mx-auto px-5 text-white">
          <span className="mb-4 inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur-sm">
            Em destaque
          </span>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            {featured.name}
          </h1>

          <p className="mt-6 max-w-lg text-lg text-white/70 sm:text-2xl">
            {featured.synopsis}
          </p>

          <Button
            render={<Link href={`/courses/${featured.id}`} />}
            nativeButton={false}
            variant="ghost"
            size="xl"
            className="mt-10 inline-flex gap-4 rounded-xl border-2 border-white font-bold duration-100 hover:scale-105 hover:border-primary"
          >
            ACESSE AGORA
            <Image
              src="/buttonPlay.svg"
              alt="Ícone de Play"
              width={15}
              height={15}
            />
          </Button>
        </Animated>
      </div>
      <a
        href="#lancamentos"
        aria-label="Ver mais conteúdo"
        className="absolute inset-x-0 bottom-6 z-20 flex justify-center opacity-80 transition-opacity hover:opacity-100"
      >
        <Image
          src="/homeNoAuth/iconArrowDown.svg"
          alt="Ver mais conteúdo"
          width={30}
          height={30}
        />
      </a>
    </div>
  );
}
