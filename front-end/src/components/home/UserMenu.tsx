"use client";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { authService } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserRound, LogOut } from "lucide-react";
import { User } from "@/schemas/userSchemas";

type UserMenuProps = {
  user?: User | null;
};

export default function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : "?";

  async function handleLogout() {
    try {
      await authService.logout();
      router.replace("/");
      router.refresh();
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
            className="h-auto gap-2 rounded-full px-2 py-1.5 hover:bg-white/10"
          >
            <Avatar>
              <AvatarFallback className="bg-primary/15 font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            {user && (
              <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">
                {user.firstName}
              </span>
            )}
          </Button>
        }
      ></DropdownMenuTrigger>

      <DropdownMenuContent className="mt-1 min-w-44">
        <DropdownMenuItem
          render={
            <Link href="/profile" className="flex items-center gap-1.5">
              <UserRound />
              Meus Dados
            </Link>
          }
        ></DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <LogOut />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
