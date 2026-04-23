import { useQuery } from "@tanstack/react-query";
import { checkUsedBefore } from "../../services/supabase/coupons/checkUsedBefore";
import { getCoupon } from "../../services/supabase/coupons/getCoupon";
import { isAfter, isBefore } from "date-fns";

export const useCheckValidCoupon = (coupon_code: string) => {
  return useQuery({
    queryKey: ["dddf", coupon_code],
    queryFn: async () => {
      const coupons = await getCoupon(coupon_code);
      if (coupons.length > 0) {
        // between range [start_date>  <end_date]
        const isAfterStartDate = isAfter(new Date(), coupons[0].start_date);
        const isBeforeEndDate = isBefore(new Date(), coupons[0].end_date);
        const isBetweenRange = isAfterStartDate && isBeforeEndDate;
        // under limit of used [used_count<max_uses]
        const isUnderLimit = coupons[0].used_count < coupons[0].max_uses;
        // is_active
        const isActive = coupons[0].is_active;
        const users = await checkUsedBefore(coupons[0].id);

        return {
          couponData: coupons[0],
          isValidCoupon: isBetweenRange && isUnderLimit && isActive,
          isUsedBefore: users.length > 0,
        };
      } else
        return {
          couponData: coupons?.[0],
          isUsedBefore: false,
          isValidCoupon: false,
        };
    },
    enabled: coupon_code !== "",
    staleTime: 0,
  });
};
