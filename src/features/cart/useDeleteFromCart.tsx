import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFromCart } from "../../services/supabase/cart/deleteFromCart";
import { useRefreshUserStats } from "../login/useRefreshUserStats";

export const useDeleteFromCart = () => {
  const { refreshUserStats } = useRefreshUserStats();
  const qClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-from-cart"],
    mutationFn: deleteFromCart,
    onSuccess: () => {
      refreshUserStats();
      qClient.invalidateQueries({
        queryKey: ["cart"],
      });
      qClient.invalidateQueries({
        queryKey: ["user_stats"],
      });
    },
  });
};
