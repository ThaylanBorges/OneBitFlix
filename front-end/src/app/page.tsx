import HeaderNoAuth from "@/components/HomeNoAuth/HeaderNoAuth";
import PresentationSection from "@/components/HomeNoAuth/PresentationSection";

export default function Home() {
  return (
    <main>
      <div className="bg-[linear-gradient(to_bottom,#8b8b8b1a,#151515),url('/homeNoAuth/backgroundPresentationSection.png')] bg-center bg-cover bg-no-repeat">
        <HeaderNoAuth />
        <PresentationSection />
      </div>
    </main>
  );
}
