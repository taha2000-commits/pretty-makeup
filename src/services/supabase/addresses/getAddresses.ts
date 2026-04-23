import type { Address } from "../../../types/address";
import { supabase } from "../init";

export const getAddresses: () => Promise<Address[]> = async () => {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .order("is_default", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};
