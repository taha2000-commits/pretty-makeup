import { useMutation, useQueryClient } from "@tanstack/react-query";
import { increaseUsedCount } from "../../services/supabase/coupons/increaseUsedCount";

export const useIncUsedCount = () => {
  const qClient = useQueryClient();
  return useMutation({
    mutationFn: increaseUsedCount,
    onSettled: () => qClient.invalidateQueries({ queryKey: ["coupons"] }),
  });
};
