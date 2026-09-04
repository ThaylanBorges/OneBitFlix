"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { Login, LoginSchema } from "@/schemas/userSchemas";
import { useRouter } from "next/navigation";
import { FieldGroup } from "../ui/field";
import { FormField } from "../ui/form-field";

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: Login) => {
    try {
      await authService.login(data);
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
      <FieldGroup className="gap-4 mt-2">
        <FormField
          control={control}
          name="email"
          label="E-mail"
          type="email"
          placeholder="Digite o seu e-mail"
        />

        <FormField
          control={control}
          name="password"
          label="Senha"
          type="password"
          placeholder="Digite a sua senha"
        />

        <Button
          type="submit"
          className="w-auto font-bold h-12 rounded-4xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </FieldGroup>
    </form>
  );
}
