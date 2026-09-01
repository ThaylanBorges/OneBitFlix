import Footer from "@/components/layout/Footer";
import Animated from "@/components/home-no-auth/Animateds";
import CardsSection from "@/components/home-no-auth/CardSection";
import HeaderNoAuth from "@/components/home-no-auth/HeaderNoAuth";
import PresentationSection from "@/components/home-no-auth/PresentationSection";
import { Suspense } from "react";
import NewestCoursesSection from "@/components/NewestCoursesSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CoursesSlideSkeleton from "@/components/SkeletonCursesSlide";

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
          <div className="mt-20">
            <p className="text-2xl font-bold text-center">
              AULAS JÁ DISPONÍVEIS
            </p>

            <Suspense fallback={<CoursesSlideSkeleton />}>
              <Animated type="fadeUp">
                <NewestCoursesSection />
                <div className="flex justify-center mt-10">
                  <Button
                    render={<Link href="/register" />}
                    nativeButton={false}
                    variant={"outline"}
                    size={"xl"}
                  >
                    Se cadastre para acessar!
                  </Button>
                </div>
              </Animated>
            </Suspense>
          </div>
        </div>
      </main>
      <Footer className="mt-20" />
    </div>
  );
}
