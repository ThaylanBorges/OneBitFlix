"use client";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Controller, useForm } from "react-hook-form";
import { Register, RegisterSchema } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormError from "./FormError";
import { authService } from "@/services/authService";

const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: Register) => {
    try {
      await authService.register(data);

      router.replace("/home");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Internal Error.");
    }
  };

  return (
    <div className="mx-auto max-w-dvh">
      <h1 className="text-3xl my-15 font-bold text-center sm:text-start">
        Seja Bem Vindo(a) ao OneBitFlix
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nome</Label>

              <Input
                id="firstName"
                type="text"
                placeholder="Digite o seu nome"
                {...register("firstName")}
              />

              {errors?.firstName && (
                <FormError message={errors.firstName.message} />
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
                <FormError message={errors.lastName.message} />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Celular</Label>

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    id="phone"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      field.onChange(formatPhone(e.target.value));
                    }}
                    placeholder="(xx) 9xxxx-xxxx"
                  />
                )}
              />

              {errors?.phone && <FormError message={errors.phone.message} />}
            </div>

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
              <Label htmlFor="birth">Data de nascimento</Label>

              <Input id="birth" type="date" {...register("birth")} />

              {errors?.birth && <FormError message={errors.birth.message} />}
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>

              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme a sua senha (Min: 6 | Max: 20)"
                {...register("confirmPassword")}
              />

              {errors?.confirmPassword && (
                <FormError message={errors.confirmPassword.message} />
              )}
            </div>

            <Button
              type="submit"
              size={"lg"}
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
