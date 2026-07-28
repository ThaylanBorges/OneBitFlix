import { HTMLAttributes } from "react";

export default function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`h-72 rounded-2xl p-3.5 bg-center bg-cover bg-no-repeat flex flex-col justify-end hover:cursor-pointer hover:scale-105 duration-200 ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
}
