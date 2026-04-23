import Button from "../../../components/Button";
import { GoArrowRight } from "react-icons/go";
import { RiCoupon3Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { type SubmitHandler } from "react-hook-form";
import { Activity, useState } from "react";
import type { CartProductType } from "../../../services/supabase/cart/getCart";
import type { Order } from "../../../types/order";
import { usePlaceOrder } from "../../../features/orders/usePlaceOrder";
import { useUser } from "../../../features/login/useUser";
import { generate8DigitNumber } from "../../../utils/helpers";
import ApplyCouponForm, { type CouponInput } from "./ApplyCouponForm";
import { CouponType } from "../../../types/coupon";
import { useIncUsedCount } from "../../../features/coupons/useIncUsedCount";
import { useAddToCouponsUsers } from "../../../features/coupons/useAddToCouponsUsers";
import clsx from "clsx";
import { useCheckValidCoupon } from "../../../features/coupons/useCheckValidCoupon";
import OrderAddress from "./OrderAddress";
import { useAddresses } from "../../../features/addresses/useAddresses";

const CartSummary = ({ cart }: { cart: CartProductType[] }) => {
  const { data: user } = useUser();
  const {
    mutate: placeOrder,
    isPending,
    isSuccess: isOrderPlaced,
  } = usePlaceOrder();

  const [searchedCoupon, setSearchedCoupon] = useState("");

  const { data, isSuccess } = useCheckValidCoupon(searchedCoupon);

  const { mutate: incUsedCount } = useIncUsedCount();
  const { mutate: addToCouponsUsers } = useAddToCouponsUsers();
  const { data: addresses } = useAddresses();
  const defaultAddress = addresses?.find((address) => address.is_default);

  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);

  const onAddCoupon: SubmitHandler<CouponInput> = (values) => {
    setSearchedCoupon(values.coupon);
  };

  const removeCoupon = () => {
    setSearchedCoupon("");
  };

  const subtotal = +cart
    .reduce((acc, product) => product.total_price + acc, 0)
    .toFixed(2);
  const discount = 0;
  const shipping = 0;
  const tax = 0;
  const couponDiscount =
    data?.couponData && data?.isValidCoupon && !data?.isUsedBefore
      ? data?.couponData?.type == CouponType.PERCENT
        ? subtotal * (data?.couponData.value / 100)
        : data?.couponData.value
      : 0;

  const order: Order = {
    total_price: subtotal + shipping + tax - (discount + couponDiscount),
    products: cart.map((product) => product),
    user_id: user?.id || "",
    id: generate8DigitNumber(),
    coupon_id:
      data?.isValidCoupon && data?.couponData && !data?.isUsedBefore
        ? data?.couponData?.id
        : undefined,
    discount_amount: +couponDiscount.toFixed(2),
    address: selectedAddress,
  };

  const handlePlaceOrder = () => {
    if (user?.id) {
      placeOrder(order, {
        onSuccess() {
          if (data?.couponData && data?.isValidCoupon && !data?.isUsedBefore) {
            incUsedCount({
              coupon_id: data?.couponData.id,
              newValue: data?.couponData.used_count + 1,
            });
            addToCouponsUsers({
              coupon_id: data?.couponData.id,
              coupon_data: data.couponData,
            });
          }
        },
      });
    }
  };

  return (
    <div className="h-fit w-full rounded-4xl bg-white p-3 capitalize shadow-2xl">
      <h5 className="mb-5 text-xl font-bold">summary</h5>
      <OrderAddress
        addresses={addresses}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
      <Activity mode={searchedCoupon && isSuccess ? "visible" : "hidden"}>
        <div className="mb-5 flex items-center justify-between rounded-xl border p-2 text-xs">
          <div className="flex items-center gap-2">
            <RiCoupon3Line size={16} />
            <span
              className={clsx(
                data?.isUsedBefore || !data?.isValidCoupon
                  ? "text-red-500"
                  : "text-green-400",
              )}
            >
              {searchedCoupon}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={clsx(
                data?.isUsedBefore || !data?.isValidCoupon
                  ? "text-red-500"
                  : "text-green-400",
              )}
            >
              {!data?.isValidCoupon
                ? "Not valid"
                : data?.isUsedBefore
                  ? "Used before"
                  : ""}
            </span>
            <IoCloseSharp className="cursor-pointer" onClick={removeCoupon} />
          </div>
        </div>
      </Activity>

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="font-thin">subtotal</span>
          <span className="font-medium">${subtotal}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-thin">shipping</span>
          <span className="font-medium">${shipping}</span>
        </div>
        {data?.isValidCoupon && !data?.isUsedBefore ? (
          <div className="flex items-center justify-between text-green-400">
            <span className="font-thin">coupon discount</span>
            <span className="font-medium">
              {data?.couponData?.type == CouponType.FIXED
                ? data?.couponData?.value + "$"
                : data?.couponData?.value + "%"}
            </span>
          </div>
        ) : null}
        <div className="flex items-center justify-between border-b">
          <span className="font-thin">tax & other fees</span>
          <span className="font-medium">${tax}</span>
        </div>
      </div>
      <div className="flex items-center justify-between border-b p-2 text-lg font-medium">
        <span className="capitalize">total amount</span>
        <span className="capitalize">
          $
          {(subtotal + shipping + tax - (discount + couponDiscount)).toFixed(2)}
        </span>
      </div>
      <ApplyCouponForm
        onAddCoupon={onAddCoupon}
        searchedCoupon={searchedCoupon}
      />
      <div className="mt-5">
        <Button
          isSuccess={isOrderPlaced}
          isLoading={isPending}
          className="w-full py-2 text-sm"
          onClick={handlePlaceOrder}
        >
          checkout & place order <GoArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
