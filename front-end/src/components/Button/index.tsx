import { ButtonHTMLAttributes } from "react";

export default function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`border-2 sm:border-transparent border-light-gray text-light-gray hover:border-light-red cursor-pointer px-4 py-2 rounded-md transition-colors duration-1000 ${className ?? ""}`}
      {...props}
    ></button>
  );
}
