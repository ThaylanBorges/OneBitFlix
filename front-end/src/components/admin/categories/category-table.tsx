"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { removeCategoryAction } from "@/actions/admin/category/removeCategoryAction";
import { CategoryArrayType } from "@/schemas/admin/categorySchema";
import { formatDate, formatDateTime } from "@/utils/formatDate";
import { ConfirmDeleteDialog } from "../confirm-delete-dialog";
import { DropdownActionTable } from "../dropdown-action-table";

type CategoryTableProps = {
  categorieList: CategoryArrayType;
};

export function CategoryTable({ categorieList }: CategoryTableProps) {
  const router = useRouter();
  // ids removidos nesta sessão — some da tela na hora, antes do refresh do servidor
  const [removedIds, setRemovedIds] = useState<number[]>([]);
  const [toDelete, setToDelete] = useState<{ id: number; name: string } | null>(
    null,
  );
  // separado de `toDelete` para o nome continuar visível durante a animação de saída
  const [dialogOpen, setDialogOpen] = useState(false);

  const categories = categorieList.filter((c) => !removedIds.includes(c.id));

  const confirmDelete = async () => {
    if (!toDelete) return true;
    const result = await removeCategoryAction(toDelete.id);

    if (!result.success) {
      toast.error(result.message);
      return false;
    }

    setRemovedIds((ids) => [...ids, toDelete.id]);
    toast.success(`Categoria "${toDelete.name}" excluída`);
    router.refresh();
    return true;
  };

  return (
    <>
      <Table>
        <TableHeader className="bg-white/3">
          <TableRow className="border-white/8 hover:bg-transparent">
            <TableHead className="w-20 pl-5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              ID
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Nome
            </TableHead>
            <TableHead className="w-28 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Posição
            </TableHead>
            <TableHead className="hidden text-xs font-medium tracking-wide text-muted-foreground uppercase md:table-cell">
              Criada em
            </TableHead>
            <TableHead className="hidden text-xs font-medium tracking-wide text-muted-foreground uppercase lg:table-cell">
              Atualizada em
            </TableHead>
            <TableHead className="w-14 pr-5">
              <span className="sr-only">Ações</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((c) => (
            <TableRow
              key={c.id}
              className="group cursor-pointer border-white/6 hover:bg-white/3"
              onClick={() => router.push(`/admin/categories/${c.id}`)}
            >
              <TableCell className="py-3.5 pl-5 font-mono text-xs text-white/45 tabular-nums">
                #{c.id}
              </TableCell>
              <TableCell className="py-3.5">
                <Link
                  href={`/admin/categories/${c.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="font-medium text-white transition-colors group-hover:text-primary focus-visible:text-primary focus-visible:outline-none"
                >
                  {c.name}
                </Link>
              </TableCell>
              <TableCell className="py-3.5">
                <span className="inline-flex h-6 min-w-8 items-center justify-center rounded-md bg-white/6 px-2 text-xs font-semibold tabular-nums ring-1 ring-white/10">
                  {c.position}
                </span>
              </TableCell>
              <TableCell
                className="hidden py-3.5 text-sm text-muted-foreground md:table-cell"
                title={formatDateTime(c.createdAt)}
              >
                {formatDate(c.createdAt)}
              </TableCell>
              <TableCell
                className="hidden py-3.5 text-sm text-muted-foreground lg:table-cell"
                title={formatDateTime(c.updatedAt)}
              >
                {formatDate(c.updatedAt)}
              </TableCell>
              <TableCell
                className="py-3.5 pr-5 text-right"
                onClick={(e) => e.stopPropagation()}
              >
                <DropdownActionTable
                  id={c.id}
                  urlName="categories"
                  onDelete={() => {
                    setToDelete({ id: c.id, name: c.name });
                    setDialogOpen(true);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmDeleteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Excluir categoria?"
        description={
          <>
            A categoria <strong className="text-white">{toDelete?.name}</strong>{" "}
            será excluída permanentemente. Essa ação não pode ser desfeita.
          </>
        }
        onConfirm={confirmDelete}
      />
    </>
  );
}
