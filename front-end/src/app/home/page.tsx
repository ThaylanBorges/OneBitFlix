import FavoriteSection from "@/components/home/FavoriteCoursesSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import NewestCoursesSection from "@/components/NewestCoursesSection";
import CoursesSlideSkeleton from "@/components/SkeletonCursesSlide";
import { userService } from "@/services/userService";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home() {
  const user = await userService.getCurrentUser();

  if (!user.success) redirect("/login");

  return (
    <main>
      <FeaturedSection />
      <div className="container mx-auto mt-20">
        <p className="px-4 text-2xl font-bold">Lançamentos</p>
        <Suspense fallback={<CoursesSlideSkeleton />}>
          <NewestCoursesSection />
        </Suspense>
      </div>
      <div className="container mx-auto mt-20">
        <p className="px-4 text-2xl font-bold">Minha lista</p>
        <FavoriteSection />
      </div>
    </main>
  );
}
