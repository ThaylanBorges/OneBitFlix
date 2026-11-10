"use client";

import Link from "next/link";
import { Eye, MoreHorizontal, SquarePen, Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type DropdownActionTableProps = {
  urlName: string;
  id: number;
  /** Chamado ao clicar em "Excluir" — normalmente abre um diálogo de confirmação */
  onDelete: (id: number) => void;
};

export function DropdownActionTable({
  id,
  urlName,
  onDelete,
}: DropdownActionTableProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Abrir ações"
            className="text-white/60 hover:text-white"
          >
            <MoreHorizontal />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href={`/admin/${urlName}/${id}`} />}>
            <Eye />
            Visualizar
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<Link href={`/admin/${urlName}/${id}/edit`} />}
          >
            <SquarePen />
            Editar
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => onDelete(id)}>
          <Trash2 />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
