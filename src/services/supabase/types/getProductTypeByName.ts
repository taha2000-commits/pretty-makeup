import { supabase } from "../init";

export const getProductTypeByName = async (name: string) => {
  const { data, error } = await supabase
    .from("product_types")
    .select("*")
    .eq("name", name);

  if (error) throw new Error(error.message);

  return data?.[0];
};
