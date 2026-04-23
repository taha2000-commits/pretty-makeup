import { supabase } from "../init";

export const deleteFromCart = async (id: number) => {
  const { error, data } = await supabase.from("cart").delete().eq("id", id);

  if (error) throw new Error(error.message);

  return data;
};
