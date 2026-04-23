import { useForm, type SubmitHandler } from "react-hook-form";
import CustomField from "../../../components/CustomField";
import { Activity, useEffect } from "react";
import { PuffLoader } from "react-spinners";
import { useCheckValidCoupon } from "../../../features/coupons/useCheckValidCoupon";
import { CouponType } from "../../../types/coupon";

export type CouponInput = {
  coupon: string;
};

const ApplyCouponForm = ({
  searchedCoupon,
  onAddCoupon,
}: {
  searchedCoupon: string;
  onAddCoupon: SubmitHandler<CouponInput>;
}) => {
  const {
    data,
    isLoading: isApplyingCoupon,
    isSuccess,
  } = useCheckValidCoupon(searchedCoupon);

  const { handleSubmit, register, reset } = useForm<CouponInput>();

  useEffect(() => {
    if (searchedCoupon == "") reset();
  }, [reset, searchedCoupon]);

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onAddCoupon)}
        className="mt-4 grid w-full grid-cols-12 border"
      >
        <div className="col-span-10">
          <CustomField
            name={"coupon"}
            register={register}
            registerOptions={{}}
            disabled={Boolean(searchedCoupon)}
            label="coupon"
            placeholder="Add Coupon"
            showLabel={false}
            className="border-none text-xs"
          />
        </div>
        <button
          type="submit"
          className="col-span-2 flex cursor-pointer items-center justify-center bg-rose-400 text-xs text-white transition-all duration-300 hover:bg-rose-300"
        >
          {isApplyingCoupon ? <PuffLoader color="" size={14} /> : "Apply"}
        </button>
      </form>
      <Activity
        mode={
          isSuccess && (!data?.isValidCoupon || data.isUsedBefore)
            ? "visible"
            : "hidden"
        }
      >
        <span className="text-xxs text-red-600 normal-case">
          {!data?.isValidCoupon
            ? "Not valid"
            : data?.isUsedBefore
              ? "Used before"
              : ""}
        </span>
      </Activity>
      <Activity
        mode={
          isSuccess && data.isValidCoupon && !data?.isUsedBefore
            ? "visible"
            : "hidden"
        }
      >
        <span className="text-xs text-green-500 normal-case">
          {`you have added a coupon with ${
            data?.couponData?.type == CouponType.FIXED
              ? data?.couponData?.value + "$"
              : data?.couponData?.value + "%"
          } off`}
        </span>
      </Activity>
    </div>
  );
};

export default ApplyCouponForm;
