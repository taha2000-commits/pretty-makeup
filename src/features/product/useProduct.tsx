import { useSuspenseQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/api/product/getProduct";

export const useProduct = (id: number) => {
  return useSuspenseQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
};
