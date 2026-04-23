import { supabase } from "../init";

export const removeFromFavs = async (id: number) => {
  const { data, error } = await supabase
    .from("favorites")
    .delete()
    .eq("product_id", id);
  if (error) throw new Error(error.message);
  return data;
};
