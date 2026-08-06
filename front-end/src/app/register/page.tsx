import RegisterForm from "@/components/forms/RegisterForm";
import Header from "@/components/HeaderGeneric";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onebitflix - Cadastro",
};

export default function Register() {
  return (
    <main>
      <Header logoUrl="/" btnUrl="/login" btnText="Fazer Login" />
      <RegisterForm />
    </main>
  );
}
