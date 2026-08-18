import HeaderAuth from "@/components/home/HeaderAuth";
import { userService } from "@/services/userService";
import { redirect } from "next/navigation";

export default async function Home() {
  let user;
  try {
    user = await userService.getCurrentUser();
  } catch {
    redirect("/auth/login");
  }

  if (!user) redirect("/auth/login");

  return (
    <div>
      <HeaderAuth />
      <h1>Você está na home, seja bem vindo! {user.firstName}</h1>
    </div>
  );
}
