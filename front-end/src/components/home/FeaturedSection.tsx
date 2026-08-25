import { courseService } from "@/services/courseService";
import Image from "next/image";
import HeaderAuth from "./HeaderAuth";
import { Button } from "../ui/button";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_BASEURL;

export async function FeaturedSection() {
  const featuredCourses = await courseService.getFeaturedCourses();
  const featured = featuredCourses[0];

  if (!featured) return null;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src={`${apiUrl}/${featured.thumbnailUrl}`}
        alt={`Foto ${featured.name}`}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-transparent" />

      <div className="relative z-20">
        <HeaderAuth />
      </div>

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container mx-auto px-5 text-white">
          <h1 className="text-5xl">{featured.name}</h1>

          <p className="mt-10 text-2xl">{featured.synopsis}</p>

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
        </div>
      </div>
    </div>
  );
}
