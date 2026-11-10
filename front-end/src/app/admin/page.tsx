import Link from "next/link";
import {
  ArrowRight,
  Clapperboard,
  House,
  PlayCircle,
  Plus,
  Tags,
  UserPlus,
  Users,
} from "lucide-react";

import { StatCard } from "@/components/admin/dashboard/stat-card";
import { PageHeader } from "@/components/admin/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dashboardService } from "@/services/admin/dashboardService";
import { userService } from "@/services/userService";
import { formatDateTime, formatRelative } from "@/utils/formatDate";

function average(total: number, by: number) {
  if (!by) return null;
  return (total / by).toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}

function greeting() {
  const hour = Number(
    new Intl.DateTimeFormat("pt-BR", {
      hour: "numeric",
      hour12: false,
      timeZone: "America/Sao_Paulo",
    }).format(new Date()),
  );
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

export default async function AdminDashboardPage() {
  const [data, user] = await Promise.all([
    dashboardService.dashboard(),
    userService.getCurrentUser(),
  ]);

  const coursesPerCategory = average(data.courses, data.categories);
  const episodesPerCourse = average(data.episodes, data.courses);

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title={`${greeting()}${user ? `, ${user.firstName}` : ""}`}
        description="Acompanhe os números da plataforma e gerencie o conteúdo."
        actions={
          <Button
            size="lg"
            render={<Link href="/admin/categories/new" />}
            nativeButton={false}
          >
            <Plus />
            Nova categoria
          </Button>
        }
      />

      <section
        aria-label="Indicadores"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label="Categorias"
          value={data.categories}
          icon={Tags}
          href="/admin/categories"
          hint="Gerenciar categorias"
          highlight
        />
        <StatCard
          label="Cursos"
          value={data.courses}
          icon={Clapperboard}
          hint={
            coursesPerCategory
              ? `≈ ${coursesPerCategory} por categoria`
              : undefined
          }
        />
        <StatCard
          label="Episódios"
          value={data.episodes}
          icon={PlayCircle}
          hint={
            episodesPerCourse ? `≈ ${episodesPerCourse} por curso` : undefined
          }
        />
        <StatCard
          label="Usuários"
          value={data.standardUsers}
          icon={Users}
          hint="Alunos cadastrados"
        />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="ring-white/8 lg:col-span-2">
          <CardHeader className="border-b border-white/8">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <UserPlus className="size-4 text-primary" />
              Usuários recentes
            </CardTitle>
            <CardDescription>Os últimos alunos que se cadastraram</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            {data.recentUsers.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
                <Users className="size-8 text-white/20" />
                <p className="text-sm text-muted-foreground">
                  Nenhum usuário cadastrado ainda.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-white/6">
                {data.recentUsers.map((u) => (
                  <li
                    key={u.id}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/3"
                  >
                    <Avatar className="size-9">
                      <AvatarFallback className="bg-white/8 text-xs font-semibold text-white/80">
                        {u.firstName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {u.firstName}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {u.email}
                      </p>
                    </div>
                    <time
                      dateTime={u.createdAt.toISOString()}
                      title={formatDateTime(u.createdAt)}
                      className="shrink-0 text-xs text-white/45"
                    >
                      {formatRelative(u.createdAt)}
                    </time>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="ring-white/8">
          <CardHeader className="border-b border-white/8">
            <CardTitle className="text-base font-semibold">
              Ações rápidas
            </CardTitle>
            <CardDescription>Atalhos para as tarefas mais comuns</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <QuickAction
              href="/admin/categories/new"
              icon={Plus}
              title="Criar categoria"
              description="Adicione uma nova categoria"
            />
            <QuickAction
              href="/admin/categories"
              icon={Tags}
              title="Ver categorias"
              description={`${data.categories} cadastradas`}
            />
            <QuickAction
              href="/home"
              icon={House}
              title="Ver o site"
              description="Abra a plataforma como aluno"
            />
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: typeof Plus;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-lg p-2.5 ring-1 ring-white/6 transition-colors hover:bg-white/4 hover:ring-white/12"
    >
      <span className="flex size-9 items-center justify-center rounded-md bg-white/5 text-white/80 group-hover:text-primary">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{title}</span>
        <span className="block truncate text-xs text-muted-foreground">
          {description}
        </span>
      </span>
      <ArrowRight className="size-4 text-white/25 transition-transform group-hover:translate-x-0.5 group-hover:text-white/70" />
    </Link>
  );
}
