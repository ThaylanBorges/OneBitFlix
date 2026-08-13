import Image from "next/image";

type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`container mx-auto flex flex-col items-center justify-center gap-4 p-4 sm:flex-row sm:justify-between ${className ?? ""}`}
    >
      <Image
        src="/logoOnebitcode.svg"
        alt="Logo OnebitCode"
        width={140}
        height={40}
      />
      <p className="text-muted-foreground">OneBitCode</p>
    </footer>
  );
}
