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
import { formatDate, formatDateTime } from "@/utils/formatDate";
import { ConfirmDeleteDialog } from "../confirm-delete-dialog";
import { DropdownActionTable } from "../dropdown-action-table";
import { CourseArrayType } from "@/schemas/admin/courseSchema";
import { removeCourseAction } from "@/actions/admin/course/removeCourseAction";

type CourseTableProps = {
  courseList: CourseArrayType;
};

export function CourseTable({ courseList }: CourseTableProps) {
  const router = useRouter();

  const [removedIds, setRemovedIds] = useState<number[]>([]);
  const [toDelete, setToDelete] = useState<{ id: number; name: string } | null>(
    null,
  );
  // separado de `toDelete` para o nome continuar visível durante a animação de saída
  const [dialogOpen, setDialogOpen] = useState(false);

  const courses = courseList.filter((c) => !removedIds.includes(c.id));

  const confirmDelete = async () => {
    if (!toDelete) return true;
    const result = await removeCourseAction(toDelete.id);

    if (!result.success) {
      toast.error(result.message);
      return false;
    }

    setRemovedIds((ids) => [...ids, toDelete.id]);
    toast.success(`Curso "${toDelete.name}" excluído`);
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
            <TableHead className="hidden text-xs font-medium tracking-wide text-muted-foreground uppercase md:table-cell">
              Synopsis
            </TableHead>
            <TableHead className="hidden text-xs font-medium tracking-wide text-muted-foreground uppercase md:table-cell">
              Thumbnail
            </TableHead>
            <TableHead className="w-28 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Destaque
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
          {courses.map((c) => (
            <TableRow
              key={c.id}
              className="group cursor-pointer border-white/6 hover:bg-white/3"
              onClick={() => router.push(`/admin/courses/${c.id}`)}
            >
              <TableCell className="py-3.5 pl-5 font-mono text-xs text-white/45 tabular-nums">
                #{c.id}
              </TableCell>
              <TableCell className="max-w-45 truncate py-3.5">
                <Link
                  href={`/admin/courses/${c.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="font-medium text-white transition-colors group-hover:text-primary focus-visible:text-primary focus-visible:outline-none"
                >
                  {c.name}
                </Link>
              </TableCell>
              <TableCell className="max-w-37 truncate py-3.5 text-sm text-muted-foreground md:table-cell">
                {c.synopsis}
              </TableCell>
              <TableCell className="max-w-37 truncate py-3.5 text-sm text-muted-foreground md:table-cell">
                {c.thumbnailUrl}
              </TableCell>
              <TableCell className="py-3.5">
                <span className="inline-flex h-6 min-w-8 items-center rounded-md bg-white/6 px-2 text-xs font-semibold tabular-nums ring-1 ring-white/10">
                  {c.featured ? (
                    <span className="text-green-300">Sim</span>
                  ) : (
                    <span className="text-red-400">Não</span>
                  )}
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
                  urlName="courses"
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
        title="Excluir curso?"
        description={
          <>
            O curso <strong className="text-white">{toDelete?.name}</strong>{" "}
            será excluída permanentemente. Essa ação não pode ser desfeita.
          </>
        }
        onConfirm={confirmDelete}
      />
    </>
  );
}
