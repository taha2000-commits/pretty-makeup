import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartProduct } from "../../services/supabase/cart/updateCartProduct";

export const useUpdateCartProduct = () => {
  const qClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartProduct,
    onSuccess: () => {
      qClient.invalidateQueries({
        queryKey: ["cart"],
      });
      qClient.invalidateQueries({
        queryKey: ["founded-in-cart-products"],
      });
    },
  });
};
