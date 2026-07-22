import { Request } from "express";

export function getPaginationParams(
  req: Request,
): [page: number, perPage: number] {
  const { page, perPage } = req.query;

  const pageNumber =
    typeof page === "string" && parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;

  const perPageNumber =
    typeof perPage === "string" && parseInt(perPage, 10) > 0
      ? parseInt(perPage, 10)
      : 10;

  return [pageNumber, perPageNumber];
}
