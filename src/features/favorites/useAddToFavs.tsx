import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavs } from "../../services/supabase/favorites/addToFavs";
import { useUser } from "../login/useUser";
import type { Favorites } from "../../types/favorites";
import { useRefreshUserStats } from "../login/useRefreshUserStats";

export const useAddToFavs = () => {
  const { data: user } = useUser();
  const { refreshUserStats } = useRefreshUserStats();
  const qClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-to-favorites"],
    mutationFn: (v: Favorites) => {
      return addToFavs({ ...v, user_id: user?.id });
    },
    onSuccess() {
      refreshUserStats();
      qClient.invalidateQueries({ queryKey: ["favorites"] });
      qClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
