import { OrderStatus } from "../../../types/order";
import { supabase } from "../init";

export const cancelOrder = async (orderID: number) => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: OrderStatus.CANCELLED })
    .eq("id", orderID);
  if (error) throw new Error(error.message);
  return data;
};
