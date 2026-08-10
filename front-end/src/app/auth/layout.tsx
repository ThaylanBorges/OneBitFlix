import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <AuthHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
