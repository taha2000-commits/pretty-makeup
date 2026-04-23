import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrder } from "../../services/supabase/orders/addOrder";
import { useClearCart } from "../cart/useClearCart";

export const usePlaceOrder = () => {
  const { mutate: clearCart } = useClearCart();
  const qClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-order"],
    mutationFn: addOrder,
    onSuccess: () => {
      clearCart();
      qClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
