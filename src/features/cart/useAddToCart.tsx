import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../../services/supabase/cart/addToCart";
import { useUser } from "../login/useUser";
import type { CartProductType } from "../../services/supabase/cart/getCart";
import { useRefreshUserStats } from "../login/useRefreshUserStats";

export const useAddToCart = () => {
  const { refreshUserStats } = useRefreshUserStats();
  const { data: user } = useUser();
  const qClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: async (newData: CartProductType) =>
      addToCart({ ...newData, user_id: user?.id }),
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
