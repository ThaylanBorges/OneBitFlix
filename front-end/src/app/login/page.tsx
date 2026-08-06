import HeaderGeneric from "@/components/HeaderGeneric";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Onebitflix - Login",
};

export default function Login() {
  return (
    <main>
      <HeaderGeneric
        logoUrl="/"
        btnText="Criar Conta"
        btnUrl="/register"
      ></HeaderGeneric>
      <div className="mx-auto max-w-dvh px-4">
        <h1 className="text-3xl my-12 font-bold text-center sm:text-start">
          Bem-vindo(a) de volta!
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
