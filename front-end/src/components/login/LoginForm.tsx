"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Login, LoginSchema } from "@/schemas/userSchemas";
import { useRouter } from "next/navigation";
import { FieldGroup } from "../ui/field";
import { FormField } from "../ui/form-field";
import { loginAction } from "@/actions/authActions";
import { InternalRouteSchema } from "@/schemas/urlSchema";

type LoginProps = {
  search: string | undefined;
};

export default function LoginForm({ search }: LoginProps) {
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
    const result = await loginAction(data);

    if (result.success) {
      const parsed = InternalRouteSchema.safeParse(search);

      const redirectUrl = parsed.success ? parsed.data : "/home";

      router.replace(redirectUrl);
      router.refresh();
    } else {
      toast.error(result.message, {
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
