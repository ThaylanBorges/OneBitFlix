import { editCourseAction } from "@/actions/admin/course/editCourseAction";
import { getCourseUploadUrlAction } from "@/actions/admin/course/getCourseUploadUrlAction";

export async function uploadThumbnail(id: number, file: File) {
  const result = await getCourseUploadUrlAction(id, file.type, file.size);

  if (!result.success) return { success: false };

  const { uploadUrl, key } = result.data;

  const res = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!res.ok) return { success: false };

  const updateThumbnail = await editCourseAction(id, {
    thumbnailUrl: key,
  });

  if (!updateThumbnail.success) return { success: false };

  return {
    success: true,
  };
}
