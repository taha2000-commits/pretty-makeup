import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/supabase/orders/orders";
import { useUser } from "../login/useUser";

export const useOrders = (status?: string) => {
  const { data: user } = useUser();
  return useQuery({
    queryKey: ["orders", status || "all"],
    queryFn: () => getOrders({ status, userID: user?.id }),
  });
};
