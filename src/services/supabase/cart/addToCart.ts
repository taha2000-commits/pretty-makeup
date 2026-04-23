import { supabase } from "../init";
import type { CartProductType } from "./getCart";

export const addToCart = async (cart: CartProductType) => {
  const { data, error } = await supabase.rpc("add_to_cart", {
    p_product_id: cart.product_id,
    p_selected_color: cart.selected_color,
    p_total_price: cart.total_price,
    p_product: cart.product,
    p_quantity: cart.quantity,
    p_id: cart.id,
  });
  if (error) throw new Error(error.message);

  return data;
};
