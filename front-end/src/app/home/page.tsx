import FavoriteSection from "@/components/home/FavoriteCoursesSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import Footer from "@/components/layout/Footer";
import NewestCoursesSection from "@/components/NewestCoursesSection";
import CoursesSlideSkeleton from "@/components/SkeletonCursesSlide";
import CategoryList from "@/components/home/CategoryList";
import SectionHeading from "@/components/home/SectionHeading";
import Animated from "@/components/Animated";
import { Suspense } from "react";
import { WhatingEpisodesSection } from "@/components/home/WhatingEpisodesSection";

export default async function Home() {
  return (
    <main>
      <FeaturedSection />
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
        <Suspense fallback={<CoursesSlideSkeleton />}>
          <WhatingEpisodesSection />
        </Suspense>
      </div>

      <div className="container mx-auto mt-16 scroll-mt-8 sm:mt-20">
        <Animated type="fadeUp">
          <SectionHeading
            title="Lançamentos"
            description="Os cursos mais recentes da plataforma"
          />
        </Animated>
        <Suspense fallback={<CoursesSlideSkeleton />}>
          <NewestCoursesSection />
        </Suspense>
      </div>

      <div className="container mx-auto mt-16 sm:mt-20">
        <Animated type="fadeUp">
          <SectionHeading
            title="Minha lista"
            description="Cursos que você favoritou"
          />
        </Animated>
        <Suspense fallback={<CoursesSlideSkeleton />}>
          <FavoriteSection />
        </Suspense>
      </div>

      <CategoryList />

      <Footer className="mt-20" />
    </main>
  );
}
