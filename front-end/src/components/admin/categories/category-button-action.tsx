"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PenBox, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { removeCategoryAction } from "@/actions/admin/category/removeCategoryAction";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "../confirm-delete-dialog";

type CategoryButtonActionProps = {
  id: number;
  name: string;
};

export function CategoryButtonAction({ id, name }: CategoryButtonActionProps) {
  const router = useRouter();

  const onDelete = async () => {
    const result = await removeCategoryAction(id);

    if (!result.success) {
      toast.error(result.message);
      return false;
    }

    toast.success(`Categoria "${name}" excluída`);
    router.push("/admin/categories");
    router.refresh();
    return true;
  };

  return (
    <div className="flex gap-2">
      <ConfirmDeleteDialog
        title="Excluir categoria?"
        description={
          <>
            A categoria <strong className="text-white">{name}</strong> será
            excluída permanentemente. Essa ação não pode ser desfeita.
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
        render={<Link href={`/admin/categories/${id}/edit`} />}
        nativeButton={false}
      >
        <PenBox />
        Editar
      </Button>
    </div>
  );
}
