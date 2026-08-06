import Header from "@/components/HeaderGeneric";
import { RegisterForm } from "@/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onebitflix - Cadastro",
};

export default function Register() {
  return (
    <main>
      <Header logoUrl="/logo" btnUrl="/login" btnText="Fazer Login" />
      <RegisterForm></RegisterForm>
    </main>
  );
}
