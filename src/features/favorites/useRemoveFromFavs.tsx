import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromFavs } from "../../services/supabase/favorites/removeFromFavs";
import { useRefreshUserStats } from "../login/useRefreshUserStats";

export const useRemoveFromFavs = () => {
  const { refreshUserStats } = useRefreshUserStats();
  const qClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromFavs,
    onSuccess() {
      refreshUserStats();
      qClient.invalidateQueries({ queryKey: ["favorites"] });
      qClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
