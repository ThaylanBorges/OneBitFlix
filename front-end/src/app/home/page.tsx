import { FeaturedSection } from "@/components/home/FeaturedSection";
import { userService } from "@/services/userService";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await userService.getCurrentUser();

  if (!user.success) redirect("/login");

  return (
    <div>
      <FeaturedSection />
    </div>
  );
}
