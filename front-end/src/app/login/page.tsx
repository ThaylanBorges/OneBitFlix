import Footer from "@/components/Footer";
import LoginForm from "@/components/forms/LoginForm";
import HeaderGeneric from "@/components/HeaderGeneric";

export const metadata = {
  title: "Onebitflix - Login",
};

export default function Login() {
  return (
    <div>
      <main>
        <HeaderGeneric
          logoUrl="/"
          btnText="Criar Conta"
          btnUrl="/register"
        ></HeaderGeneric>
        <LoginForm />
      </main>
      <Footer></Footer>
    </div>
  );
}
