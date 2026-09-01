import { FeaturedSection } from "@/components/home/FeaturedSection";
import NewestCoursesSection from "@/components/newest-courses-section/NewestCoursesSection";
import NewestCoursesSkeleton from "@/components/newest-courses-section/Skeleton";
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
        <Suspense fallback={<NewestCoursesSkeleton />}>
          <NewestCoursesSection />
        </Suspense>
      </div>
    </main>
  );
}
