import Image from "next/image";
import { Course } from "@/schemas/courseSchema";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import Link from "next/link";

type SlideProps = {
  courses: Course[];
};

export default function Slide({ courses }: SlideProps) {
  return (
    <div className="container mt-20 p-4 m-auto">
      <p className="text-2xl font-bold text-center">AULAS JÁ DISPONÍVEIS</p>
      <Carousel>
        <CarouselContent>
          {courses.map((course) => (
            <CarouselItem
              key={course.id}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer"
            >
              <div className="relative aspect-square mt-10 overflow-hidden rounded-lg">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}`}
                  alt={`Foto ${course.name}`}
                  fill
                  className="object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="mt-2 min-h-15.5">
                <p className="font-bold line-clamp-2">{course.name}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.synopsis}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      <div className="flex justify-center mt-5">
        <Button
          render={<Link href="/register" />}
          nativeButton={false}
          variant={"outline"}
          size={"xl"}
          className="border-white"
        >
          Se cadastre para acessar!
        </Button>
      </div>
    </div>
  );
}
