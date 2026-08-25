import { FeaturedSection } from "@/components/home/FeaturedSection";
import { userService } from "@/services/userService";
import { redirect } from "next/navigation";

export default async function Home() {
  let user;

  try {
    user = await userService.getCurrentUser();
  } catch {
    redirect("/login");
  }

  if (!user) redirect("/login");

  return (
    <div>
      <FeaturedSection />
    </div>
  );
}
