"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PenBox, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "../confirm-delete-dialog";
import { removeCourseAction } from "@/actions/admin/course/removeCourseAction";

type CourseButtonActionProps = {
  id: number;
  name: string;
};

export function CourseButtonAction({ id, name }: CourseButtonActionProps) {
  const router = useRouter();

  const onDelete = async () => {
    const result = await removeCourseAction(id);

    if (!result.success) {
      toast.error(result.message);
      return false;
    }

    toast.success(`Curso "${name}" excluído`);
    router.push("/admin/courses");
    return true;
  };

  return (
    <div className="flex gap-2">
      <ConfirmDeleteDialog
        title="Excluir curso?"
        description={
          <>
            O curso <strong className="text-white">{name}</strong> será excluído
            permanentemente. Essa ação não pode ser desfeita.
          </>
        }
        onConfirm={onDelete}
        trigger={
          <Button
            size="lg"
            variant="ghost"
            className="text-white/70 hover:bg-primary/10 hover:text-primary"
          >
            <Trash2 />
            Excluir
          </Button>
        }
      />
      <Button
        size="lg"
        render={<Link href={`/admin/courses/${id}/edit`} />}
        nativeButton={false}
      >
        <PenBox />
        Editar
      </Button>
    </div>
  );
}
