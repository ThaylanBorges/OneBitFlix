"use client";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { Register, RegisterSchema } from "@/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/register/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
};

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(RegisterSchema) });

  const router = useRouter();

  const onSubmit = async (data: Register) => {
    const result = await registerUser(data);
    if (!result.success) return toast.error(result.error);
    toast.success("Conta criada com sucesso!");
    router.push("/login?registered=true");
  };

  return (
    <div className="mx-auto max-w-dvh px-4">
      <h1 className="text-3xl my-12 font-bold text-center sm:text-start">
        Seja Bem Vindo(a) ao OneBitFlix
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>

              <Input
                id="name"
                type="text"
                placeholder="Digite o seu nome"
                {...register("firstName")}
              />

              {errors?.firstName && (
                <p className="text-sm text-red-500  p-1">
                  {errors?.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Sobrenome</Label>

              <Input
                id="lastName"
                type="text"
                placeholder="Digite o seu sobrenome"
                {...register("lastName")}
              />

              {errors?.lastName && (
                <p className="text-sm text-red-500" p-1>
                  {errors?.lastName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Celular</Label>

              <Input
                {...register("phone")}
                onChange={(e) => setValue("phone", formatPhone(e.target.value))}
              />

              {errors?.phone && (
                <p className="text-sm text-red-500" p-1>
                  {errors?.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>

              <Input
                id="email"
                type="email"
                placeholder="Digite o seu e-mail"
                {...register("email")}
              />

              {errors?.email && (
                <p className="text-sm text-red-500" p-1>
                  {errors?.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birth">Data de nascimento</Label>

              <Input id="birth" type="date" {...register("birth")}></Input>

              {errors?.birth && (
                <p className="text-sm text-red-500" p-1>
                  {errors?.birth.message}
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
                <p className="text-sm text-red-500" p-1>
                  {errors?.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>

              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme a sua senha (Min: 6 | Max: 20)"
                {...register("confirmPassword")}
              />

              {errors?.confirmPassword && (
                <p className="text-sm text-red-500" p-1>
                  {errors?.confirmPassword.message}
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
              {isSubmitting ? "Criando a conta..." : "Criar conta"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
