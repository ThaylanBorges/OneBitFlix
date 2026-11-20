type EpisodesPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function EpisodesPage({
  searchParams,
}: EpisodesPageProps) {
  const { page } = await searchParams;

  const currentPage = Math.max(1, Number(page) || 1);
}
