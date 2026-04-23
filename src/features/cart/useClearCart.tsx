import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCartTable } from "../../services/supabase/cart/clearCartTable";
import { useRefreshUserStats } from "../login/useRefreshUserStats";

export const useClearCart = () => {
  const { refreshUserStats } = useRefreshUserStats();

  const qClient = useQueryClient();
  return useMutation({
    mutationKey: ["clear"],
    mutationFn: clearCartTable,
    onSuccess: () => {
      refreshUserStats();
      qClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
