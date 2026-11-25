"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CourseForm } from "./course-form";
import { CourseFormType, CourseUpdateType } from "@/schemas/admin/courseSchema";
import { editCourseAction } from "@/actions/admin/course/editCourseAction";
import { SelectOption } from "@/components/ui/form-select";
import { uploadThumbnail } from "./upload-thumbnail";

type CourseEditFormProps = {
  id: number;
  defaultValues: CourseFormType;
  categoryOptions: SelectOption[];
};

export function CourseEditForm({
  id,
  defaultValues,
  categoryOptions,
}: CourseEditFormProps) {
  const router = useRouter();

  const onSubmit = async (data: CourseUpdateType) => {
    const { name, synopsis, featured, thumbnail, categoryId } = data;

    const course = await editCourseAction(id, {
      name,
      synopsis,
      featured,
      categoryId,
    });

    if (!course.success) {
      toast.error(course.message);
      return;
    }

    if (thumbnail) {
      const res = await uploadThumbnail(id, thumbnail);

      if (!res.success) {
        toast.error(
          `Curso ${data.name} atualizado, mas a imagem não foi salva`,
        );
        return;
      }
    }

    toast.success(`Curso "${data.name}" atulizado`);
    router.replace("/admin/courses");
  };

  return (
    <CourseForm
      onSubmit={onSubmit}
      categoryOptions={categoryOptions}
      defaultValues={defaultValues}
      cancelHref={`/admin/courses/${id}`}
      submitLabel="Salvar alterações"
    />
  );
}
