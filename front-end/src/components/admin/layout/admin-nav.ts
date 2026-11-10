import { LayoutDashboard, Tags, type LucideIcon } from "lucide-react";

export type AdminNavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  /** Descrição curta usada no cabeçalho/breadcrumb */
  description?: string;
};

export type AdminNavGroup = {
  label: string;
  items: AdminNavItem[];
};

/**
 * Menus da sidebar do Admin.
 * Para adicionar uma nova tabela (ex.: Cursos, Episódios, Usuários),
 * basta incluir um item no grupo "Tabelas".
 */
export const adminNav: AdminNavGroup[] = [
  {
    label: "Geral",
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        description: "Visão geral da plataforma",
      },
    ],
  },
  {
    label: "Tabelas",
    items: [
      {
        title: "Categorias",
        href: "/admin/categories",
        icon: Tags,
        description: "Organize os cursos por categoria",
      },
      // { title: "Cursos", href: "/admin/courses", icon: Clapperboard },
      // { title: "Episódios", href: "/admin/episodes", icon: PlayCircle },
      // { title: "Usuários", href: "/admin/users", icon: Users },
    ],
  },
];

/** Retorna true quando o item deve aparecer como ativo para a rota atual. */
export function isNavItemActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin" || pathname === "/admin/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Encontra o item de menu correspondente à rota atual. */
export function findActiveNavItem(pathname: string) {
  for (const group of adminNav) {
    for (const item of group.items) {
      if (isNavItemActive(pathname, item.href)) return item;
    }
  }
  return null;
}
