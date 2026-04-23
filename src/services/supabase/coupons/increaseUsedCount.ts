import { supabase } from "../init";

export const increaseUsedCount = async ({
  coupon_id,
  newValue,
}: {
  coupon_id: string;
  newValue: number;
}) => {
  const { data, error } = await supabase
    .from("coupons")
    .update({ used_count: newValue })
    .eq("id", coupon_id)
    .select();

  if (error) throw new Error(error.message);

  return data;
};
