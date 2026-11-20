"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CourseForm } from "./course-form";
import { CourseFormType } from "@/schemas/admin/courseSchema";
import { createCourseAction } from "@/actions/admin/course/createCourseAction";
import { SelectOption } from "@/components/ui/form-select";
import { uploadThumbnail } from "./upload-thumbnail";

type CourseNewFormProps = {
  categoryOptions: SelectOption[];
};

export function CourseNewForm({ categoryOptions }: CourseNewFormProps) {
  const router = useRouter();

  const onSubmit = async (data: CourseFormType) => {
    const { name, synopsis, featured, thumbnail, categoryId } = data;

    const course = await createCourseAction({
      name,
      synopsis,
      featured,
      categoryId,
    });

    if (!course.success) {
      toast.error(`Falha ao criar curso ${course.message}`);
      return;
    }

    const id = course.data;

    if (thumbnail) {
      const res = await uploadThumbnail(id, thumbnail);

      if (!res.success) {
        toast.error(`Curso ${data.name} criado, mas a imagem não foi salva`);
        router.replace(`/admin/courses/${id}/edit`);
        return;
      }
    }

    toast.success(`Curso "${data.name}" criado`);
    router.replace("/admin/courses");
  };

  return (
    <CourseForm
      onSubmit={onSubmit}
      submitLabel="Criar curso"
      categoryOptions={categoryOptions}
    />
  );
}
