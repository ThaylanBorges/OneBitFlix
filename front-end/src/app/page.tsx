import Footer from "@/components/layout/Footer";
import Animated from "@/components/home-no-auth/Animateds";
import CardsSection from "@/components/home-no-auth/CardSection";
import HeaderNoAuth from "@/components/home-no-auth/HeaderNoAuth";
import NewestCoursesSection from "@/components/home-no-auth/newest-courses-section/NewestCoursesSection";
import NewestCoursesSkeleton from "@/components/home-no-auth/newest-courses-section/Skeleton";
import PresentationSection from "@/components/home-no-auth/PresentationSection";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <main className="bg-[linear-gradient(to_bottom,#8b8b8b1a,#151515),url('/homeNoAuth/backgroundPresentationSection.png')] bg-center bg-cover bg-no-repeat">
        <HeaderNoAuth />
        <div className="px-4">
          <Animated type="fadeZoomIn">
            <PresentationSection />
          </Animated>
          <Animated type="fadeRight">
            <CardsSection />
          </Animated>
          <Suspense fallback={<NewestCoursesSkeleton />}>
            <Animated type="fadeUp">
              <NewestCoursesSection />
            </Animated>
          </Suspense>
        </div>
      </main>
      <Footer className="mt-20" />
    </div>
  );
}
