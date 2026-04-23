import { useQuery } from "@tanstack/react-query";
import { getProductTypes } from "../../services/supabase/types/getProductTypes";

export const useProductTypes = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: getProductTypes,
  });
};
