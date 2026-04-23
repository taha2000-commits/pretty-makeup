import type { Color } from "../../../types/product";
import { supabase } from "../init";

export const updateCartProduct = async ({
  cartId,
  newColor,
  newQuantity,
  total_price,
}: {
  cartId: number;
  newColor: Color;
  newQuantity: unknown;
  total_price: number;
}) => {
  const { data, error } = await supabase
    .from("cart")
    .update({ selected_color: newColor, quantity: newQuantity, total_price })
    .eq("id", cartId);

  if (error) throw new Error(error.message);

  return data;
};
