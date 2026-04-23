import type { Address } from "../../../types/address";
import { supabase } from "../init";

export const updateAddress = async ({
  addressId,
  addressNewData,
}: {
  addressId: string;
  addressNewData: Omit<Address, "id" | "is_default" | "created_at">;
}) => {
  const { data, error } = await supabase
    .from("addresses")
    .update({ ...addressNewData })
    .eq("id", addressId);
  if (error) throw new Error(error.message);
  return data;
};
