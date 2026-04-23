import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCouponsUsers } from "../../services/supabase/coupons/addToCouponsUsers";

export const useAddToCouponsUsers = () => {
  const qClient = useQueryClient();
  return useMutation({
    mutationFn: addToCouponsUsers,
    onSettled: () => qClient.invalidateQueries({ queryKey: ["coupon_users"] }),
  });
};
