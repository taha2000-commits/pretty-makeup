import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "../../services/supabase/orders/cancelOrder";

export const useCancelOrder = () => {
  const qClient = useQueryClient();


  const mutation = useMutation({
    mutationKey: ["cancel-order"],
    mutationFn: cancelOrder,
    onSuccess: () => {
      qClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
  return { ...mutation, cancelOrder: mutation.mutate };
};
