"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownActionTable } from "../dropdown-action-table";
import { CategoryArrayType } from "@/schemas/admin/categorySchema";
import { removeCategoryAction } from "@/actions/admin/category/removeCategoryAction";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

type CategoryTableProps = {
  categorieList: CategoryArrayType;
};

export function CategoryTable({ categorieList }: CategoryTableProps) {
  const [categories, setCategories] = useState(categorieList);
  const router = useRouter();

  const onDelete = async (id: number) => {
    const result = await removeCategoryAction(id);

    if (!result.success) {
      toast.error(result.message);
    } else {
      setCategories(categories.filter((c) => c.id !== id));
      toast.success("Categoria excluída");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Posição</TableHead>
          <TableHead>Data de criação</TableHead>
          <TableHead>Data de atualização</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((c) => (
          <TableRow
            key={c.id}
            className="cursor-pointer"
            onClick={() => router.push(`/admin/categories/${c.id}`)}
          >
            <TableCell>{c.id}</TableCell>
            <TableCell>{c.name}</TableCell>
            <TableCell>{c.position}</TableCell>
            <TableCell>{c.createdAt.toDateString()}</TableCell>
            <TableCell>{c.updatedAt.toDateString()}</TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <DropdownActionTable
                id={c.id}
                urlName="categories"
                onDelete={onDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow></TableRow>
      </TableFooter>
    </Table>
  );
}
