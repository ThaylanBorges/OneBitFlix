import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import UserMenu from "./UserMenu";

export default function HeaderAuth() {
  return (
    <div className="flex-col w-full gap-5 sm:flex-row container mx-auto p-5 flex justify-between items-center">
      <Link href="/home">
        <Image
          src="/logoOnebitflix.svg"
          alt="logo Onebitflix"
          width={200}
          height={200}
        ></Image>
      </Link>

      <div className="flex w-full sm:w-auto gap-4 items-center">
        <form className="flex min-w-0 flex-1 gap-1">
          <Input
            type="search"
            name="search"
            placeholder="Pesquisar"
            className="w-full sm:w-64"
          />
          <Button type="submit" variant={"ghost"}>
            <Image
              src="/homeAuth/iconSearch.svg"
              alt="Logo de pesquisa"
              width={15}
              height={15}
            />
          </Button>
        </form>
        <UserMenu />
      </div>
    </div>
  );
}
