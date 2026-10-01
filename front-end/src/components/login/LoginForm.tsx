"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { Login, LoginSchema } from "@/schemas/userSchemas";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldGroup } from "../ui/field";
import { FormField } from "../ui/form-field";
import { internalRouteSchema } from "@/schemas/urlSchema";

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

  const searchParams = useSearchParams();
  const search = searchParams.get("callbackUrl");

  const onSubmit = async (data: Login) => {
    try {
      await authService.login(data);

      const result = internalRouteSchema.safeParse(search);

      const redirectUrl = result.success ? result.data : "/home";

      router.replace(redirectUrl);
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
