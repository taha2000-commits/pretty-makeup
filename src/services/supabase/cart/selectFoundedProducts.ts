import { supabase } from "../init";
import type { CartProductType } from "./getCart";

export const selectFoundedProducts: (
  product_id: number,
) => Promise<CartProductType[]> = async (product_id) => {
  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("product_id", product_id)
    .select();
  if (error) throw new Error(error.message);

  return data;
};
