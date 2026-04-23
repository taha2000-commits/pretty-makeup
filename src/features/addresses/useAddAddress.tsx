import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAddress } from "../../services/supabase/addresses/addAddress";

export const useAddAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};
