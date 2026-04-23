import type {  CouponUser } from "../../../types/coupon";
import { supabase } from "../init";

export const getUsedCoupons: () => Promise<CouponUser[]> = async () => {
  const { data, error } = await supabase.from("coupon_users").select("*");

  if (error) throw new Error(error.message);

  return data;
};
