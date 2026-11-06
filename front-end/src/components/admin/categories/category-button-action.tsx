"use client";
import { removeCategoryAction } from "@/actions/admin/category/removeCategoryAction";
import { Button } from "@/components/ui/button";
import { PenBox, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CategoryButtonActionProps = {
  id: number;
};

export function CategoryButtonAction({ id }: CategoryButtonActionProps) {
  const router = useRouter();

  const onDelete = async () => {
    const result = await removeCategoryAction(id);

    if (result.success) {
      router.push("/admin/categories");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex gap-3">
      <Button
        size="lg"
        variant="outline"
        className="border-primary text-primary"
        render={<Link href={`/admin/categories/${id}/edit`} />}
        nativeButton={false}
      >
        <PenBox />
        Editar
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="border-primary text-primary"
        onClick={onDelete}
      >
        <Trash />
        Apagar
      </Button>
    </div>
  );
}
