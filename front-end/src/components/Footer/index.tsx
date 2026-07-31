import Image from "next/image";

export default function Footer() {
  return (
    <div className="container mx-auto mt-20 mb-5 p-4 flex justify-between items-center">
      <Image
        src="/logoOnebitcode.svg"
        alt="Logo OnebitCode"
        width={400}
        height={400}
      ></Image>
      <p className="text-2xl text-muted-foreground">OneBitCode</p>
    </div>
  );
}
