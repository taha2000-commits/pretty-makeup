import { useQuery,  } from "@tanstack/react-query";
import { getBrandByName } from "../../services/supabase/brands/getBrandByName";

export const useBrand = (brand_name: string) => {
  return useQuery({
    queryKey: ["brand", brand_name],
    queryFn: () => getBrandByName(brand_name),
  });
};
