import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserStats } from "../../services/supabase/auth/updateUserStats";

export const useRefreshUserStats = () => {
  const qClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUserStats,
    onSettled: () => {
      qClient.invalidateQueries({
        queryKey: ["user_stats"],
      });
    },
  });
  return { ...mutation, refreshUserStats: mutation.mutate };
};
