import LoginForm from "@/components/login/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Onebitflix - Login",
};

export default function Login() {
  return (
    <div className="mx-auto max-w-3xl px-4">
      <h1 className="text-3xl my-8 font-bold text-center sm:text-start">
        Bem-vindo(a) de volta!
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>
            <p className="font-bold">Faça seu Login</p>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
