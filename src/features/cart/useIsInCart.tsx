import { useQuery } from "@tanstack/react-query";
import { isInCart } from "../../services/supabase/cart/isInCart";
import type { Color } from "../../types/product";

export const useIsInCart = (product_id: number, selected_color: Color) => {
  const query = useQuery({
    queryKey: ["is-in-cart", product_id, selected_color],
    queryFn: () => isInCart(product_id, selected_color),
  });

  return {
    ...query,
    data: Boolean(query.data?.[0]),
    isInCart: Boolean(query.data?.[0]),
  };
};
