import { getCourseByIdAction } from "@/actions/getCourseByIdAction";
import { SectionButtonsReact } from "@/components/course/SectionButtonsReact";
import HeaderAuth from "@/components/home/HeaderAuth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

const apiUrl = process.env.NEXT_PUBLIC_BASEURL;

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = await getCourseByIdAction(Number(id));

  if (!course.success) redirect("/home");

  return (
    <div>
      <main>
        <div className="relative h-screen w-full overflow-hidden">
          <div className="relative z-20 bg-black">
            <HeaderAuth />
          </div>
          <Image
            src={`${apiUrl}/${course.data.thumbnailUrl}`}
            alt={`foto curso ${course.data.name}`}
            fill
          ></Image>

          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-transparent" />

          <div className="absolute inset-0 z-10 flex items-center">
            <div className="container mx-auto px-5 text-white">
              <h1 className="text-5xl">{course.data.name}</h1>

              <p className="mt-10 text-2xl">{course.data.synopsis}</p>

              <Button
                render={<Link href={`/courses/${course.data.id}`} />}
                nativeButton={false}
                variant="ghost"
                size="xl"
                className="mt-10 inline-flex gap-4 rounded-xl border-2 border-white font-bold duration-100 hover:scale-105 hover:border-primary"
              >
                VER AULAS!
                <Image
                  src="/buttonPlay.svg"
                  alt="Ícone de Play"
                  width={15}
                  height={15}
                />
              </Button>
              <div className="my-5 flex gap-2">
                <SectionButtonsReact
                  favorited={course.data.favorited}
                  liked={course.data.liked}
                  courseId={course.data.id}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
