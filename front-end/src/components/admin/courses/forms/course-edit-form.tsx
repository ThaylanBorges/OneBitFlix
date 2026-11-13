"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CourseForm } from "./course-form";
import { CourseFormType, CourseUpdateType } from "@/schemas/admin/courseSchema";
import { editCourseAction } from "@/actions/admin/course/editCourseAction";
import { SelectOption } from "@/components/ui/form-select";
import { getCourseUploadUrlAction } from "@/actions/admin/course/getCourseUploadUrlAction";

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

    if (course.success) {
      if (thumbnail) {
        const result = await getCourseUploadUrlAction(
          id,
          thumbnail.type,
          thumbnail.size,
        );

        if (result.success) {
          const { uploadUrl, key } = result.data;

          await fetch(uploadUrl, {
            method: "PUT",
            body: thumbnail,
            headers: {
              "Content-Type": thumbnail.type,
            },
          });

          await editCourseAction(id!, { thumbnailUrl: key });
        } else {
          toast.error(result.message);
        }
      }

      toast.success(`Curso "${data.name}" atulizado`);
      router.replace("/admin/courses");
    } else {
      toast.error(course.message);
    }
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
