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

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Login>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = async (data: Login) => {
    const result = await login(data);
    if (!result.success) return toast.error(result.error);
    toast.success("Login realizado com sucesso!");
  };

  return (
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

            {errors?.email && (
              <p className="text-sm text-red-500 p-1">
                {errors?.email.message}
              </p>
            )}
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
              <p className="text-sm text-red-500 p-1">
                {errors?.password.message}
              </p>
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
  );
}
