import {  type Order } from "../../../types/order";
import { supabase } from "../init";

export const getOrders: (params: {
  userID?: string;
  status?: string;
}) => Promise<Order[]> = async ({ userID, status }) => {
  
  if (!userID) return [];

  const x = supabase.from("orders").select("*");

  if (status && status !== "all") x.eq("status", status);

  const { data: orders, error } = await x;

  if (error) throw new Error(error.message);
  return orders;
};
