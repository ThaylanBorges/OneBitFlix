import Image from "next/image";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { Search } from "./Search";

export default function HeaderAuth() {
  return (
    <div className="flex-col w-full gap-5 sm:flex-row container mx-auto p-4 flex justify-between items-center">
      <Link href="/home">
        <Image
          src="/logoOnebitflix.svg"
          alt="logo Onebitflix"
          width={200}
          height={200}
        ></Image>
      </Link>

      <div className="flex w-full sm:w-auto gap-4 items-center">
        <Search />
        <UserMenu />
      </div>
    </div>
  );
}
