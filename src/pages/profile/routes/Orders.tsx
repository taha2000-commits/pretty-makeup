import { Link, useSearchParams } from "react-router";
import { useOrders } from "../../../features/orders/useOrders";
import OrderStatusBarEl from "../components/OrderStatusBarEl";
import { OrderStatus } from "../../../types/order";
import LoadingScreen from "../../loading/LoadingScreen";
import OrderCard from "../components/OrderCard";

const Orders = () => {
  const [URLSearchParams] = useSearchParams();
  const statusParam = URLSearchParams.get("status");

  const { data: orders, isLoading } = useOrders(statusParam || "all");

  return (
    <div className="flex h-full flex-col gap-5">
      <h3 className="text-4xl font-thin capitalize">Orders</h3>
      <div className="flex items-center justify-center text-xs whitespace-nowrap sm:text-sm">
        <div className="flex rounded-full bg-black p-0.5 text-white capitalize">
          <OrderStatusBarEl isLoading={isLoading} status={"all"} />
          <OrderStatusBarEl
            isLoading={isLoading}
            status={OrderStatus.INPROGRESS}
          />
          <OrderStatusBarEl
            isLoading={isLoading}
            status={OrderStatus.DELIVERED}
          />
          <OrderStatusBarEl
            isLoading={isLoading}
            status={OrderStatus.CANCELLED}
          />
        </div>
      </div>
      {isLoading ? (
        <LoadingScreen size={100} />
      ) : !orders?.[0] ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-center text-4xl font-bold text-gray-400 sm:text-6xl">
            {!statusParam || statusParam == OrderStatus.INPROGRESS
              ? "No in progress orders yet"
              : statusParam === OrderStatus.DELIVERED
                ? "No delivered orders yet"
                : statusParam === OrderStatus.CANCELLED
                  ? "No cancelled orders yet"
                  : "No orders yet"}
          </span>
          <Link
            to={"/"}
            className="text-rose-400 underline hover:text-rose-500"
          >
            Start shopping now!
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {orders?.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
