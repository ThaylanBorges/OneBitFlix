import RegisterForm from "@/components/register/RegisterForm";
import AuthShell from "@/components/auth/AuthShell";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onebitflix - Cadastro",
};

export default function Register() {
  return (
    <AuthShell
      eyebrow="Acesso limitado"
      title="Tenha acesso aos melhores tutoriais de programação."
      formTitle="Criar conta"
      footer={
        <>
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Entrar
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
