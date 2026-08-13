"use client";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { authService } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UserMenu() {
  const route = useRouter();

  async function handleLogout() {
    try {
      await authService.logout();
      route.replace("/");
      route.refresh();
    } catch {
      toast.error("Erro ao sair da conta");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="bg-gray-400 px-2.5 py-6 rounded-full"
          >
            User
          </Button>
        }
      ></DropdownMenuTrigger>

      <DropdownMenuContent className="mt-1">
        <DropdownMenuItem
          render={<Link href="/profile">Meus Dados</Link>}
        ></DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
