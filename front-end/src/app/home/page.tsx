import { userService } from "@/services/userService";

export default async function Home() {
  const user = await userService.getCurrentUser();

  return <h1>Você está na home, seja bem vindo! {user.firstName}</h1>;
}
