import Image from "next/image";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { Search } from "./Search";
import React from "react";

export default function HeaderAuth({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-end">
      <div className="flex-col w-full gap-5 sm:flex-row container mx-auto p-4 flex justify-between items-center">
        <Link href="/home">
          <Image
            src="/logoOnebitflix.svg"
            alt="logo Onebitflix"
            width={200}
            height={200}
          ></Image>
        </Link>

        <div className="flex w-full sm:w-auto gap-4 justify-center items-center">
          <Search />
          <UserMenu />
        </div>
      </div>
      <div className="pr-5 pb-5">{children}</div>
    </div>
  );
}
