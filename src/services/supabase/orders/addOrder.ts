import type { Order } from "../../../types/order";
import { supabase } from "../init";

export const addOrder = async (order: Order) => {
  const { data, error } = await supabase.from("orders").insert([order]);
  if (error) throw new Error(error.message);
  return data;
};
