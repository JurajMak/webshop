import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "../queries";
import { getCategory } from "../api/categories";

export function useCategories(name) {
  return useQuery({
    queryKey: QUERIES.CATEGORIES(name),
    queryFn: getCategory(name),
  });
}
