import HeaderAuth from "@/components/home/HeaderAuth";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { userService } from "@/services/userService";
import { redirect } from "next/navigation";

export default async function Profile() {
  const user = await userService.getCurrentUser();

  if (!user.success) redirect("/login");

  return (
    <main>
      <div className="bg-black">
        <HeaderAuth />
      </div>
      <ProfileTabs user={user} />
    </main>
  );
}
