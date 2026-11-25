import HeaderAuth from "@/components/home/HeaderAuth";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { userService } from "@/services/userService";

export default async function Profile() {
  const user = await userService.getCurrentUser();

  return (
    <main>
      <div className="bg-black">
        <HeaderAuth />
      </div>
      <ProfileTabs user={user} />
    </main>
  );
}
