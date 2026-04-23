import { format } from "date-fns";
import { useUser } from "../../../features/login/useUser";
import { useUserStats } from "../../../features/login/useUserStats";
import { useUsedCoupons } from "../../../features/coupons/useUsedCoupons";
import { CouponType } from "../../../types/coupon";
import { Fragment } from "react/jsx-runtime";

const Account = () => {
  const { data: user } = useUser();
  const { data: user_stats } = useUserStats();
  const { data: used_coupons } = useUsedCoupons();

  return (
    <div className="flex flex-col gap-5 p-5 sm:p-0">
      <h3 className="text-4xl font-thin capitalize">Account</h3>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4 sm:col-span-3">
          <div className="aspect-square w-full overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-2xl"></div>
        </div>
        <div className="col-span-8 flex flex-col justify-center gap-1 sm:col-span-9">
          <h5 className="text-2xl">{user?.user_metadata.username}</h5>
          <span className="font-thi text-sm text-gray-300">
            {user?.user_metadata.email}
          </span>
          <div className="">
            <span className="text-sm whitespace-nowrap text-gray-300">
              joined at {format(user?.created_at || "", "MMMM yyyy")}
            </span>
          </div>
        </div>
        <div className="col-span-full">
          <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
            <div className="flex flex-col items-center gap-1 rounded-3xl bg-white p-2 font-medium shadow-2xl sm:p-3">
              <span className="">{user_stats?.orders_count ?? 0}</span>
              <span className="capitalize">orders</span>
            </div>

            <div className="flex flex-col items-center gap-1 rounded-3xl bg-white p-2 font-medium shadow-2xl sm:p-3">
              <span className="">{user_stats?.cart_count ?? 0}</span>
              <span className="capitalize">in cart</span>
            </div>

            <div className="flex flex-col items-center gap-1 rounded-3xl bg-white p-2 font-medium shadow-2xl sm:p-3">
              <span className="">{user_stats?.favs_count ?? 0}</span>
              <span className="capitalize">in favs</span>
            </div>
          </div>
          {used_coupons?.[0] && (
            <div className="sm:text-md mt-10 text-sm">
              <span className="font-bold capitalize">used coupons</span>
              <div className="grid w-full grid-cols-5">
                <div className="col-span-full grid h-3 grid-cols-5 border-b">
                  <div className="col-span-2 border-r text-center"></div>
                  <div className="col-span-1 border-r text-center"></div>
                  <div className="col-span-2 text-center"></div>
                </div>
                <div className="col-span-full grid grid-cols-5 border-b font-bold capitalize">
                  <div className="col-span-2 border-r text-center">code</div>
                  <div className="col-span-1 border-r text-center">value</div>
                  <div className="col-span-2 text-center">used at</div>
                </div>
                {used_coupons.map((coupon) => (
                  <Fragment key={coupon.id}>
                    <div className="col-span-full grid grid-cols-5 border-b">
                      <div className="col-span-2 border-r text-center">
                        {coupon.coupon_data.code}
                      </div>
                      <div className="col-span-1 border-r text-center">
                        {coupon.coupon_data.value}
                        {coupon.coupon_data.type == CouponType.PERCENT
                          ? "%"
                          : "$"}
                      </div>
                      {coupon.used_at && (
                        <div className="col-span-2 text-center">
                          {format(coupon.used_at, "MMMM dd, yyyy")}
                        </div>
                      )}
                    </div>
                  </Fragment>
                ))}
                <div className="col-span-full grid h-3 grid-cols-5">
                  <div className="col-span-2 border-r text-center"></div>
                  <div className="col-span-1 border-r text-center"></div>
                  <div className="col-span-2 text-center"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
