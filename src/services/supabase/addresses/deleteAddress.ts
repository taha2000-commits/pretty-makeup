import { supabase } from "../init";

export const deleteAddress = async (addressId: string) => {
  const { data, error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId);
  if (error) throw new Error(error.message);
  return data;
};
