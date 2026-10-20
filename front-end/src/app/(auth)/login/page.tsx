import LoginForm from "@/components/login/LoginForm";
import AuthShell from "@/components/auth/AuthShell";
import Link from "next/link";

export const metadata = {
  title: "Onebitflix - Login",
};

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
};

export default async function Login({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;

  const search = Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl;

  return (
    <AuthShell
      eyebrow="Bem-vindo(a) de volta"
      title="Continue de onde você parou nos seus estudos."
      formTitle="Faça seu Login"
      footer={
        <>
          Ainda não tem uma conta?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Criar conta
          </Link>
        </>
      }
    >
      <LoginForm search={search} />
    </AuthShell>
  );
}
