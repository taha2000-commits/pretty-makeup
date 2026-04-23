import { supabase } from "../init";

export const setAddressAsDefault = async (addressId: string) => {
  const addresses = await supabase.from("addresses");
  const { error } = await addresses
    .update({ is_default: false })
    .eq("is_default", true);
  if (error) throw new Error(error.message);
  const { data, error: updateError } = await addresses
    .update({ is_default: true })
    .eq("id", addressId);
  
  if (updateError) throw new Error(updateError.message);
  return data;
};
