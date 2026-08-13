"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function Header() {
  const pathName = usePathname();
  const isLoginPage = pathName === "/auth/login";

  return (
    <header className="bg-black">
      <div className="container mx-auto flex flex-col gap-4 sm:flex-row items-center justify-between p-4">
        <Link href="/">
          <Image
            src="/logoOnebitflix.svg"
            alt="Logo Onebitflix"
            width={150}
            height={150}
          />
        </Link>
        <Button
          render={
            <Link href={`${isLoginPage ? "/auth/register" : "/auth/login"}`} />
          }
          variant="outline"
          size="lg"
          className="hover:bg-transparent hover:border-primary"
        >
          {isLoginPage ? "Crie Sua Conta" : "Faça Login"}
        </Button>
      </div>
    </header>
  );
}
