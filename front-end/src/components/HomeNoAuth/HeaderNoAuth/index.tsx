import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function HeaderNoAuth() {
  return (
    <>
      <div className="bg-light-red flex justify-center items-center text-center gap-3 sm:gap-7 px-4 py-1">
        <Image
          src="/homeNoAuth/logoCta.png"
          alt="Logo OneBitFlix"
          width={40}
          height={40}
        />
        <p>Se cadastre para ter acesso aos cursos</p>
        <Image
          src="/homeNoAuth/logoCta.png"
          alt="Logo OneBitFlix"
          width={40}
          height={40}
        />
      </div>
      <div className="container mx-auto flex justify-center sm:justify-between flex-wrap mt-5 gap-5 px-4 py-4">
        <Image
          src="/logoOnebitflix.svg"
          alt="Logo OneBitFlix"
          width={215}
          height={215}
        />
        <div className="flex gap-5">
          <Link href="/login">
            <Button>Entrar</Button>
          </Link>
          <Link href="/register">
            <Button>Quero fazer parte</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
