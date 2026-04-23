import { supabase } from "../init";

export const clearCartTable = async () => {
  const { error, data } = await supabase.from("cart").delete().neq("id", 0);

  if (error) throw new Error(error.message);

  return data;
};
