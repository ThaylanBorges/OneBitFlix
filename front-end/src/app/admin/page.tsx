import { dashboardService } from "@/services/admin/dashboardService";

export default async function Admin() {
  const data = await dashboardService.dashboard();

  return (
    <>
      <h1>Dashboard</h1>
      <p>Categorias: {data.categories}</p>
      <p>Cursos: {data.courses}</p>
    </>
  );
}
