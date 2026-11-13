"use client";

import Link from "next/link";
import { Loader2, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { CourseFormSchema, CourseFormType } from "@/schemas/admin/courseSchema";
import { FormInput } from "@/components/ui/form-input";
import { FormTextarea } from "@/components/ui/form-textarea";
import { FormCheckbox } from "@/components/ui/form-checkbox";
import { FormFile } from "@/components/ui/form-file";
import { FormSelect, SelectOption } from "@/components/ui/form-select";

type CourseFormProps = {
  onSubmit: (data: CourseFormType) => void | Promise<void>;
  defaultValues?: CourseFormType;
  cancelHref?: string;
  submitLabel?: string;
  categoryOptions: SelectOption[];
};

export function CourseForm({
  onSubmit,
  defaultValues,
  cancelHref = "/admin/courses",
  submitLabel = "Salvar",
  categoryOptions,
}: CourseFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CourseFormType>({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: defaultValues ?? {
      name: "",
      synopsis: "",
      featured: false,
      categoryId: 0,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl overflow-hidden rounded-xl bg-card ring-1 ring-white/8"
    >
      <div className="border-b border-white/8 px-6 py-4">
        <h2 className="font-semibold">Informações do curso</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          O nome aparece para os alunos; a posição define a ordem na home.
        </p>
      </div>

      <FieldGroup className="gap-5 px-6 py-6">
        <FormInput
          control={control}
          name="name"
          label="Nome"
          type="text"
          placeholder="Ex.: Aprendendo a programar em C#"
        />

        <FormTextarea
          control={control}
          name="synopsis"
          label="Descrição"
          rows={6}
          placeholder="Descreva o curso..."
        />

        <FormFile
          control={control}
          name="thumbnail"
          label="Imagem de fundo"
          accept="image/png,image/jpeg,image/webp"
        />

        <FormSelect
          control={control}
          label="Categoria"
          name="categoryId"
          options={categoryOptions}
        />

        <FormCheckbox control={control} name="featured" label="Destaque" />
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
