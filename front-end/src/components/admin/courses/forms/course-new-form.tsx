"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CourseForm } from "./course-form";
import { CourseInputType } from "@/schemas/admin/courseSchema";
import { createCourseAction } from "@/actions/admin/course/createCourseAction";
import { SelectOption } from "@/components/ui/form-select";
import { getCourseUploadUrlAction } from "@/actions/admin/course/getCourseUploadUrlAction";
import { editCourseAction } from "@/actions/admin/course/editCourseAction";

type CourseNewFormProps = {
  categoryOptions: SelectOption[];
};

export function CourseNewForm({ categoryOptions }: CourseNewFormProps) {
  const router = useRouter();

  const onSubmit = async (data: CourseInputType) => {
    const { name, synopsis, featured, thumbnail, categoryId } = data;

    const course = await createCourseAction({
      name,
      synopsis,
      featured,
      categoryId,
    });

    if (course.success) {
      if (thumbnail) {
        const result = await getCourseUploadUrlAction(
          course.id!,
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

          await editCourseAction(course.id!, { thumbnailUrl: key });
        } else {
          toast.error(result.message);
        }
      }

      toast.success(`Curso "${data.name}" criado`);
      router.replace("/admin/courses");
    } else {
      toast.error(course.message);
    }
  };

  return (
    <CourseForm
      onSubmit={onSubmit}
      submitLabel="Criar curso"
      categoryOptions={categoryOptions}
    />
  );
}
