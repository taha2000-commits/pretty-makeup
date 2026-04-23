import clsx from "clsx";
import Button from "../../../components/Button";
import { OrderStatus, type Order } from "../../../types/order";
import OrderProduct from "./OrderProduct";
import { format } from "date-fns/format";
import { useCancelOrder } from "../../../features/orders/useCancelOrder";

function getClassNameFromStatus(status?: OrderStatus) {
  switch (status) {
    case OrderStatus.INPROGRESS:
      return {
        className: "border-amber-600 bg-amber-100 text-amber-500",
        pointClassName: "bg-amber-600",
      };
    case OrderStatus.DELIVERED:
      return {
        className: "border-green-600 bg-green-100 text-green-500",
        pointClassName: "bg-green-600",
      };
    case OrderStatus.CANCELLED:
      return {
        className: "border-red-600 bg-red-100 text-red-500",
        pointClassName: "bg-red-600",
      };
    default:
      return {
        className: "",
        pointClassName: "",
      };
  }
}
interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const { cancelOrder, isPending, isSuccess: isCanceled } = useCancelOrder();
  const handleCancelOrder = (orderID: number) => {
    cancelOrder(orderID);
  };

  return (
    <div
      key={order.id}
      className={clsx(
        "flex flex-col pb-7 not-last:border-b not-last:border-rose-400",
      )}
    >
      <div
        className={clsx(
          "flex justify-between capitalize",
          order.address ? "mb-3" : "mb-7",
        )}
      >
        {order.created_at && (
          <div className="sm:text-md text-xs">
            <h5 className="">{format(order.created_at, "EEE, MMM d")}</h5>
            <p className="text-gray-400">order: #{order.id}</p>
          </div>
        )}

        <div
          className={clsx(
            "flex h-fit items-center gap-1 rounded-full border p-2 py-1 text-xs",
            getClassNameFromStatus(order.status).className,
          )}
        >
          <span
            className={clsx(
              "block aspect-square w-2 rounded-full",
              getClassNameFromStatus(order.status).pointClassName,
            )}
          ></span>
          <span className="">{order.status}</span>
        </div>

        <div className="sm:text-md flex flex-col items-center text-xs">
          <div className="">total price</div>
          <div className="text-rose-400">{order.total_price?.toFixed(1)}$</div>
        </div>
      </div>
      {order.address && (
        <div className="sm:text-md mb-7 flex items-center gap-2 text-xs text-gray-400 capitalize">
          <span className="capitalize">address:</span>
          <div className="flex flex-wrap items-center gap-1 whitespace-nowrap">
            {Object.values({
              country: order.address.country,
              governorate: order.address.governorate,
              city: order.address.city,
              street: order.address.street,
              building: order.address.building,
            }).map((key, i, arr) => (
              <span className="">
                {key}
                {i < arr.length - 1 && ","}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-5">
        {order.products.map(({ product, quantity, selected_color }, i) => (
          <OrderProduct
            key={i}
            product={product}
            quantity={quantity}
            selected_color={selected_color}
          />
        ))}
      </div>
      {order.status == OrderStatus.INPROGRESS && (
        <div className="mt-7 flex justify-end">
          <Button
            isLoading={isPending}
            isSuccess={isCanceled}
            onClick={() => handleCancelOrder(order.id || 0)}
          >
            cancel
          </Button>
        </div>
      )}
    </div>
  );
};
export default OrderCard;
