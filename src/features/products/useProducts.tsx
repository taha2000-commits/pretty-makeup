import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/api/products/getProducts";
import type { Pagination, Params } from "../../types/params";

const useProducts = (params?: {
  params?: Params;
  pagination?: Pagination;
  iskeepPreviousData?: boolean;
}) => {
  
  const query = useQuery({
    queryKey: ["products", params?.params],
    queryFn: () => getProducts(params?.params),
    placeholderData: params?.iskeepPreviousData ? keepPreviousData : undefined,
  });

  if (params?.pagination?.pageSize) {
    return {
      ...query,
      products: query.data?.slice(
        (params.pagination.page - 1) * params.pagination.pageSize,
        params.pagination.pageSize * params.pagination.page,
      ),
    };
  }
  return { ...query, count: query.data?.length, products: query.data };
};


export default useProducts;
