"use client";

import Link from "next/link";
import { Loader2, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { FormField } from "@/components/ui/form-field";
import {
  CategoryInputSchema,
  CategoryInputType,
} from "@/schemas/admin/categorySchema";

type CategoryFormProps = {
  onSubmit: (data: CategoryInputType) => void | Promise<void>;
  defaultValues?: CategoryInputType;
  cancelHref?: string;
  submitLabel?: string;
};

export function CategoryForm({
  onSubmit,
  defaultValues,
  cancelHref = "/admin/categories",
  submitLabel = "Salvar",
}: CategoryFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CategoryInputType>({
    resolver: zodResolver(CategoryInputSchema),
    defaultValues: defaultValues ?? { name: "", position: 0 },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl overflow-hidden rounded-xl bg-card ring-1 ring-white/8"
    >
      <div className="border-b border-white/8 px-6 py-4">
        <h2 className="font-semibold">Informações da categoria</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          O nome aparece para os alunos; a posição define a ordem na home.
        </p>
      </div>

      <FieldGroup className="gap-5 px-6 py-6">
        <FormField
          control={control}
          name="name"
          label="Nome"
          type="text"
          placeholder="Ex.: Front-end"
        />

        <FormField
          control={control}
          name="position"
          label="Posição"
          type="number"
          placeholder="Ex.: 1"
        />
      </FieldGroup>

      <div className="flex flex-col-reverse gap-2 border-t border-white/8 bg-white/2 px-6 py-4 sm:flex-row sm:justify-end">
        <Button
          variant="ghost"
          size="lg"
          render={<Link href={cancelHref} />}
          nativeButton={false}
        >
          Cancelar
        </Button>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />}
          {isSubmitting ? "Salvando..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
