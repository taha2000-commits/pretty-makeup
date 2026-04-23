import type { Coupon } from "../../../types/coupon";
import { supabase } from "../init";

export const getFeaturedCoupon: () => Promise<Coupon> = async () => {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("is_featured", true);

  if (error) throw new Error(error.message);

  return data[0];
};
