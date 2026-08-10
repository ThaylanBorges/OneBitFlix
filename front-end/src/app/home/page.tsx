import HeaderAuth from "@/components/home/HeaderAuth";
import { userService } from "@/services/userService";

export default async function Home() {
  const user = await userService.getCurrentUser();

  return (
    <div>
      <HeaderAuth />
      <h1>Você está na home, seja bem vindo! {user.firstName}</h1>
    </div>
  );
}
