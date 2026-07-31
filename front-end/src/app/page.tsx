import Footer from "@/components/Footer";
import Animated from "@/components/HomeNoAuth/Animateds";
import CardsSection from "@/components/HomeNoAuth/CardsSection";
import HeaderNoAuth from "@/components/HomeNoAuth/HeaderNoAuth";
import NewestCoursesSection from "@/components/HomeNoAuth/NewestCoursesSection";
import NewestCoursesSkeleton from "@/components/HomeNoAuth/NewestCoursesSection/Skeleton";
import PresentationSection from "@/components/HomeNoAuth/PresentationSection";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <div className="bg-[linear-gradient(to_bottom,#8b8b8b1a,#151515),url('/homeNoAuth/backgroundPresentationSection.png')] bg-center bg-cover bg-no-repeat">
        <Animated type="fadeZoomIn">
          <HeaderNoAuth />
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
        <Footer />
      </div>
    </main>
  );
}
