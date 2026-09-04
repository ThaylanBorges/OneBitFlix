"use client";

import { useForm } from "react-hook-form";
import { FieldGroup } from "../ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { User } from "@/types/user";
import { formatPhone } from "@/utils/formatter";
import { EditProfile, EditProfileSchema } from "@/schemas/userSchemas";
import { editProfileAction } from "@/actions/editProfileAction";
import { FormField } from "../ui/form-field";

type EditProfileUserProps = {
  user: User;
};

export default function EditProfileForm({ user }: EditProfileUserProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EditProfile>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: formatPhone(user.phone),
    },
  });

  const onSubmit = async (data: EditProfile) => {
    const result = await editProfileAction(data);

    if (!result.success) {
      toast.error(result.message, {
        className: "mt-15",
      });
    }

    toast.success("Usuário editado com sucesso");
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
          type="tel"
          placeholder="(xx) 9xxxxx-xxxx"
          onChange={formatPhone}
        />

        <FormField
          control={control}
          name="email"
          label="E-mail"
          type="email"
          placeholder="Digite seu e-mail"
        />

        <Button
          type="submit"
          className="w-full h-12 font-bold rounded-4xl"
          disabled={isSubmitting}
        >
          Editar
        </Button>
      </FieldGroup>
    </form>
  );
}
