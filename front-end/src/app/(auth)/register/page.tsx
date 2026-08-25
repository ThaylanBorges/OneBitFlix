import RegisterForm from "@/components/register/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onebitflix - Cadastro",
};

export default function Register() {
  return <RegisterForm />;
}
