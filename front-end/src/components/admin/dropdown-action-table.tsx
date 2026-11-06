"use client";

import { Eye, Menu, SquarePen, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

type DropdowActionTableProps = {
  urlName: string;
  id: number;
  onDelete: (id: number) => Promise<void>;
};

export function DropdownActionTable({
  id,
  urlName,
  onDelete,
}: DropdowActionTableProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant={"secondary"}>
            <Menu />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              className="flex items-center p-2 gap-2"
              href={`/admin/${urlName}/${id}`}
            >
              <Eye />
              Visualizar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="flex items-center p-2 gap-2"
              href={`/admin/${urlName}/${id}/edit`}
            >
              <SquarePen /> Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={async () => await onDelete(id)}>
            <span className="flex items-center p-2 gap-2">
              <Trash /> Deletar
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
