"use client";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login, LoginSchema } from "@/schemas/loginSchema";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { login } from "@/app/login/actions";
import FormError from "./FormError";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(LoginSchema) });

  const onSubmit = async (data: Login) => {
    const result = await login(data);
    if (!result.success) return toast.error(result.error);
    toast.success("Login realizado com sucesso!");
  };

  return (
    <div className="mx-auto max-w-dvh pb-11">
      <h1 className="text-3xl my-12 font-bold text-center sm:text-start">
        Bem-vindo(a) de volta!
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Faça seu Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>

              <Input
                id="email"
                type="email"
                placeholder="Digite o seu e-mail"
                {...register("email")}
              />

              {errors?.email && <FormError message={errors.email.message} />}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>

              <Input
                id="password"
                type="password"
                placeholder="Digite a sua senha (Min: 6 | Max: 20)"
                {...register("password")}
              />

              {errors?.password && (
                <FormError message={errors.password.message} />
              )}
            </div>

            <Button
              type="submit"
              size={"xl"}
              variant="default"
              className="w-full font-bold "
              disabled={isSubmitting}
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
