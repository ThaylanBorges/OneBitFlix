"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { FormField } from "@/components/ui/form-field";
import {
  CategoryInputSchema,
  CategoryInputType,
} from "@/schemas/admin/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type CategoryFormProps = {
  onSubmit: (data: CategoryInputType) => void;
  defaultValues?: CategoryInputType;
};

export function CategoryForm({ onSubmit, defaultValues }: CategoryFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CategoryInputType>({
    resolver: zodResolver(CategoryInputSchema),
    defaultValues: defaultValues ?? { name: "", position: 0 },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4 mt-2">
        <FormField
          control={control}
          name="name"
          label="Nome"
          type="text"
          placeholder="Digite o nome da categoria"
        />

        <FormField
          control={control}
          name="position"
          label="Posição"
          type="number"
          placeholder="Digite a posição da categoria"
        />
      </FieldGroup>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
}
