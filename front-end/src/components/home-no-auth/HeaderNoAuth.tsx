import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeaderNoAuth() {
  return (
    <>
      <div className="bg-primary flex justify-center items-center text-center gap-3 sm:gap-7 px-4 py-1">
        <Image
          src="/homeNoAuth/logoCta.png"
          alt="Logo OneBitFlix"
          width={40}
          height={40}
          priority
        />
        <p>Se cadastre para ter acesso aos cursos</p>
        <Image
          src="/homeNoAuth/logoCta.png"
          alt="Logo OneBitFlix"
          width={40}
          height={40}
          priority
        />
      </div>
      <div className="container mx-auto flex justify-center sm:justify-between flex-wrap mt-5 gap-5 py-4">
        <Image
          src="/logoOnebitflix.svg"
          alt="Logo OneBitFlix"
          width={215}
          height={215}
          priority
        />
        <div className="flex gap-5">
          <Button
            render={<Link href="/login" />}
            nativeButton={false}
            variant="outline"
            size={"lg"}
            className="sm:border-transparent border-muted-foreground bg-transparent text-muted-foreground hover:border-primary hover:bg-transparent transition-colors duration-300"
          >
            Entrar
          </Button>
          <Button
            render={<Link href="/register" />}
            nativeButton={false}
            variant="outline"
            size={"lg"}
            className="sm:border-transparent border-muted-foreground bg-transparent text-muted-foreground hover:border-primary hover:bg-transparent transition-colors duration-300"
          >
            Quero fazer parte
          </Button>
        </div>
      </div>
    </>
  );
}
