import {
  Box,
  H1,
  H2,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from "@adminjs/design-system";
import { ApiClient, ViewHelpers } from "adminjs";
import { useEffect, useMemo, useState } from "react";
import { DashboardData, DashboardMetrics } from "../types/dashboard.types.js";

const RESOUCE_LABELS: Record<keyof DashboardMetrics, string> = {
  courses: "Cursos",
  episodes: "Episódios",
  categories: "Categorias",
  standardUsers: "Usuários padrão",
};

const h = new ViewHelpers();

export default function Dashboard() {
  const [resources, setResources] = useState<DashboardData | null>(null);
  const api = useMemo(() => new ApiClient(), []);

  useEffect(() => {
    api
      .getDashboard()
      .then((res) => setResources(res.data as DashboardData))
      .catch((err) => console.log(`Erro ao carregar dados do dashboard`, err));
  }, [api]);

  if (!resources) return <Text>Carregando...</Text>;

  const { recentUsers, ...metrics } = resources;

  return (
    <Box padding="lg">
      <H1>Seja bem vindo(a)</H1>

      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        marginBottom="x1"
        style={{ gap: "1rem" }}
      >
        {Object.entries(metrics).map(([key, value]) => (
          <Box
            key={key}
            flex="1"
            minWidth="150px"
            padding="lg"
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 1px 4px rgb(0,0,0,0.1)",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              if (key !== "standardUsers") {
                window.location.href = h.listUrl(key);
              } else {
                window.location.href = h.resourceActionUrl({
                  resourceId: "users",
                  actionName: "list",
                  search: "?page=1&filters.role=user",
                });
              }
            }}
          >
            <Text>{RESOUCE_LABELS[key as keyof DashboardMetrics]}</Text>
            <H2 style={{ color: "#ff0043", margin: "0.5rem 0 0" }}>{value}</H2>
          </Box>
        ))}
      </Box>

      <Box>
        {recentUsers && recentUsers.length > 0 && (
          <Box
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "1.5rem",
              boxShadow: "0 1px 4px rgb(0,0,0,0.1",
            }}
          >
            <H2>Usuários Recentes</H2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Cadastro</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.location.href = h.showUrl(
                        "users",
                        String(user.id),
                      );
                    }}
                  >
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>
    </Box>
  );
}
