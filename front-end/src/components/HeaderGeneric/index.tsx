import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

type HeaderProps = {
  logoUrl: string;
  btnUrl: string;
  btnText: string;
};

export default function HeaderGeneric({
  logoUrl,
  btnUrl,
  btnText,
}: HeaderProps) {
  return (
    <header className="bg-black">
      <div className="container mx-auto flex flex-col gap-4 sm:flex-row items-center justify-between p-4">
        <Link href={logoUrl}>
          <Image
            src="/logoOnebitflix.svg"
            alt="Logo Onebitflix"
            width={150}
            height={150}
          />
        </Link>
        <Button
          render={<Link href={btnUrl} />}
          variant="outline"
          size="lg"
          className="hover:bg-transparent hover:border-primary"
        >
          {btnText}
        </Button>
      </div>
    </header>
  );
}
