import type { CouponUser } from "../../../types/coupon";
import { supabase } from "../init";

export const addToCouponsUsers = async (couponUser: CouponUser) => {
  const { data, error } = await supabase
    .from("coupon_users")
    .insert([couponUser]);

  if (error) throw new Error(error.message);

  return data;
};
