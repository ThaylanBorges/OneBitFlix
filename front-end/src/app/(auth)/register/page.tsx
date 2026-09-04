import RegisterForm from "@/components/register/RegisterForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onebitflix - Cadastro",
};

export default function Register() {
  return (
    <div className="mx-auto max-w-3xl px-4">
      <h1 className="my-8 text-3xl font-bold text-center sm:text-start">
        Seja Bem Vindo(a) ao OneBitFlix
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>
            <p className="font-bold">Criar conta</p>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
