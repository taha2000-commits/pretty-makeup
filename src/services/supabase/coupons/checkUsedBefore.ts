import type { CouponUser } from "../../../types/coupon";
import { supabase } from "../init";

export const checkUsedBefore: (
  coupon_id: string,
) => Promise<CouponUser[]> = async (coupon_id) => {
  const { data, error } = await supabase
    .from("coupon_users")
    .select("*")
    .eq("coupon_id", coupon_id);

  if (error) throw new Error(error.message);

  return data;
};
