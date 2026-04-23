import { useFeaturedCoupon } from "../../features/coupons/useFeaturedCoupon";
import { CouponType } from "../../types/coupon";

export const AnnouncementBar = () => {
  const { data: featuredCoupon } = useFeaturedCoupon();

  return (
    <div className="group overflow-hidden bg-pink-600">
      <div className="animate-marquee sm:text-md flex items-center gap-15 py-3 text-sm text-white group-hover:[animation-play-state:paused]">
        {featuredCoupon && (
          <div className="whitespace-nowrap">
            {`💄 Weekly Coupon Alert! `}
            <span className="font-sirin text-lg font-bold text-black">
              {featuredCoupon.code}
            </span>
            {` with ${featuredCoupon.value}${featuredCoupon.type == CouponType.FIXED ? "$" : "%"} off`}
          </div>
        )}
        <div className="whitespace-nowrap">
          🚚 Free Delivery Offer! Enjoy free shipping on orders over $50 💄
        </div>
        <div className="whitespace-nowrap">
          💋 New Customer Gift! Get 10% OFF your first order when you sign up ✨
        </div>
        <div className="whitespace-nowrap">
          ⏳ Flash Sale! Up to 30% OFF selected makeup items — limited time
          only! 🔥
        </div>
      </div>
    </div>
  );
};
export default AnnouncementBar;
