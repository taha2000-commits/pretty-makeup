import type { ProductType } from "../../../types/product-type";
import { supabase } from "../init";

export const getProductTypes: () => Promise<ProductType[]> = async () => {
  const { data, error } = await supabase.from("product_types").select("*");
  if (error) throw new Error(error.message);
  return data;
};
