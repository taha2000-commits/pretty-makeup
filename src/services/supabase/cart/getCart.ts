import type { Color, Product } from "../../../types/product";
import { supabase } from "../init";

export type CartProductType = {
  id: number;
  product_id: number;
  product: Product;
  quantity: number;
  selected_color: Color;
  total_price: number;
  user_id?: string;
};

export const getCart: () => Promise<CartProductType[]> = async () => {
  const { data: cart, error } = await supabase.from("cart").select("*");
  if (error) throw new Error(error.message);
  return cart as CartProductType[];
};
