import { useQuery } from "@tanstack/react-query";
import { isInFavs } from "../../services/supabase/favorites/isInFavs";

export const useIsInFavs = (product_id: number) => {
  const query = useQuery({
    queryKey: ["is-in-cart", product_id],
    queryFn: () => isInFavs(product_id),
  });

  return { ...query, data: Boolean(query.data?.[0]) };
};
