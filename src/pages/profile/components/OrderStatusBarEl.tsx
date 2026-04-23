import { useSearchParams } from "react-router";
import type { OrderStatus } from "../../../types/order";
import { clsx } from "clsx";
import { RoseColor_2 } from "../../../utils/constants";
import { PuffLoader } from "react-spinners";

interface OrderStatusBarElProps {
  status: OrderStatus | "all";
  isLoading: boolean;
}

const OrderStatusBarEl = ({ isLoading, status }: OrderStatusBarElProps) => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  const statusParam = URLSearchParams.get("status");

  const handleNavItemClick = (status?: OrderStatus | "all") => {
    URLSearchParams.set("status", status || "all");
    SetURLSearchParams(URLSearchParams);
  };

  return (
    <div
      onClick={() => handleNavItemClick(status)}
      className={clsx(
        "flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 hover:bg-white hover:text-black sm:px-5",
        (statusParam === status || (status === "all" && !statusParam)) &&
          "bg-white text-black",
      )}
    >
      {status}
      {isLoading && statusParam === status && (
        <PuffLoader loading size={14} color={RoseColor_2} />
      )}
    </div>
  );
};
export default OrderStatusBarEl;
