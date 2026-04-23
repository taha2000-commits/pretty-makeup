import { supabase } from "../init";

export const isInFavs = async (product_id: number) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("product_id", product_id);
  if (error) throw new Error(error.message);

  return data;
};