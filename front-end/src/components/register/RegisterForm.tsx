"use client";

import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Register, RegisterSchema } from "@/schemas/userSchemas";
import { FieldGroup } from "../ui/field";
import { authService } from "@/services/authService";
import { formatPhone } from "@/utils/formatter";
import { FormField } from "../ui/form-field";

export default function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      birth: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: Register) => {
    try {
      await authService.register(data);

      router.replace("/home");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Internal Error.", {
        className: "mt-15",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <FormField
          control={control}
          name="firstName"
          label="Nome"
          placeholder="Digite seu nome"
        />

        <FormField
          control={control}
          name="lastName"
          label="Sobrenome"
          placeholder="Digite seu sobrenome"
        />

        <FormField
          control={control}
          name="phone"
          label="Telefone"
          placeholder="Digite seu Telefone"
          onChange={formatPhone}
        />

        <FormField
          control={control}
          name="birth"
          label="Data de nascimento"
          type="date"
        />
        <FormField
          control={control}
          name="email"
          label="E-mail"
          type="email"
          placeholder="Digite seu e-mail"
        />

        <FormField
          control={control}
          name="password"
          label="Digite a senha"
          type="password"
        />

        <FormField
          control={control}
          name="confirmPassword"
          label="Digite novamente a senha"
          type="password"
        />

        <Button
          type="submit"
          className="w-full h-12 font-bold rounded-4xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Cadastrando..." : "Registrar"}
        </Button>
      </FieldGroup>
    </form>
  );
}
