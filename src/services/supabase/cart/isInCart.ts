import type { Color } from "../../../types/product";
import { supabase } from "../init";

export const isInCart = async (product_id: number, selected_color: Color) => {
  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("product_id", product_id)
    .eq("selected_color", JSON.stringify(selected_color))
    .select("*");
  if (error) throw new Error(error.message);

  return data;
};
