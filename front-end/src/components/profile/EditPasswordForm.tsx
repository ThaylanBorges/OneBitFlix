"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "../ui/field";
import { Button } from "../ui/button";
import { editPasswordAction } from "@/actions/editPasswordAction";
import { toast } from "sonner";
import { EditPassword, EditPasswordSchema } from "@/schemas/userSchemas";
import { FormField } from "../ui/form-field";

export default function EditPasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EditPassword>({
    resolver: zodResolver(EditPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: EditPassword) => {
    const result = await editPasswordAction(data);

    if (!result.success) {
      toast.error(result.message, {
        className: "mt-15",
      });
    }

    toast.success("Senha alterada com sucesso");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <FormField
          control={control}
          name="currentPassword"
          label="Senha atual"
          type="password"
          placeholder="Digite sua senha"
        />

        <FormField
          control={control}
          name="newPassword"
          label="Digite a nova senha"
          type="password"
          placeholder="Digite sua nova senha"
        />

        <Button
          className="h-12 font-bold rounded-4xl"
          type="submit"
          disabled={isSubmitting}
        >
          Editar
        </Button>
      </FieldGroup>
    </form>
  );
}
