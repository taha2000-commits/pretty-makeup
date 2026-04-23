import { useQuery } from "@tanstack/react-query";
import { getUsedCoupons } from "../../services/supabase/coupons/getUsedCoupons";

export const useUsedCoupons = () => {
  return useQuery({
    queryKey: ["used_coupons"],
    queryFn: getUsedCoupons,
  });
};
