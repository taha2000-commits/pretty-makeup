import type { Coupon } from "../../../types/coupon";
import { supabase } from "../init";

export const getCoupon: (coupon_code: string) => Promise<Coupon[]> = async (
  coupon_code,
) => {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", coupon_code);

  if (error) throw new Error(error.message);

  return data;
};
