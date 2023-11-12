import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { QUERIES } from "../queries";
import { getProductById, getProducts } from "../api/products";

export function useProductById(id, options) {
  return useQuery({
    queryKey: QUERIES.PRODUCT(id),
    queryFn: () => getProductById(id),
    ...options,
  });
}
