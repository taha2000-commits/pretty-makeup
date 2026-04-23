import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAddress } from "../../services/supabase/addresses/updateAddress";

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAddress,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};
