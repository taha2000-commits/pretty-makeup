import { useQuery } from "@tanstack/react-query";
import { getFeaturedCoupon } from "../../services/supabase/coupons/getFeaturedCoupon";

export const useFeaturedCoupon = () => {
  return useQuery({
    queryKey: ["featured-coupon"],
    queryFn: getFeaturedCoupon,
  });
};
