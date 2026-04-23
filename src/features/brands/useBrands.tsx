import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../../services/supabase/brands/getBrands";

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
};
