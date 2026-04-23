import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setAddressAsDefault } from "../../services/supabase/addresses/setAddressAsDefault";

export const useSetAddressAsDefault = () => {
  const qClient = useQueryClient();
  return useMutation({
    mutationFn: setAddressAsDefault,
    onSettled: () => {
      qClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};
