import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "../../services/supabase/addresses/getAddresses";

export const useAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });
};
