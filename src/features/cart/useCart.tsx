import { useSuspenseQuery } from "@tanstack/react-query";
import { getCart } from "../../services/supabase/cart/getCart";

export const useCart = () => {
  return useSuspenseQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};
