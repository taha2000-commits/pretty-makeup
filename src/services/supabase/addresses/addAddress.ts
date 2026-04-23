import type { Address } from "../../../types/address";
import { supabase } from "../init";

export const addAddress = async (
  address: Omit<Address, "id" | "created_at" | "is_default">,
) => {
  console.log(address);

  const { data, error } = await supabase
    .from("addresses")
    .insert(address)
    .select();
  if (error) throw new Error(error.message);
  return data;
};
