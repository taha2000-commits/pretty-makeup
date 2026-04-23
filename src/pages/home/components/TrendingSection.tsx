import { Activity, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import TrendingSlider from "./TrendingSlider";
import clsx from "clsx";
import useProducts from "../../../features/products/useProducts";
import { PuffLoader } from "react-spinners";
import { RoseColor_1 } from "../../../utils/constants";
import type { ProductType } from "../../../types/product-type";

const TrendingSection = ({
  productsTypes,
}: {
  productsTypes: ProductType[];
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("eyeshadow");

  const { products, isLoading } = useProducts({
    params: {
      product_type: activeCategory,
    },
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });

  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className="grid gap-10 p-5 py-10 pb-0 sm:gap-15 sm:p-20">
      <div className="flex flex-col items-center gap-5">
        <h1 className="font-sekuya text-center text-4xl font-bold text-rose-400 sm:text-7xl">
          Trending Now
        </h1>
        <h5 className="font-playwright text-center text-sm sm:text-lg">
          Discover the most loved beauty products everyone is obsessed with
          right now
        </h5>
      </div>

      <div className="mx-auto w-fit border-t border-b border-rose-400 sm:px-10">
        <div className="sm:text-md container mx-auto flex flex-wrap items-center justify-center text-sm capitalize xl:flex-nowrap">
          {productsTypes?.map((cat, i) => (
            <div
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.name);
                swiperRef.current?.slideTo(i);
              }}
              className={clsx(
                "flex cursor-pointer gap-1 px-2 py-1 pt-2 whitespace-nowrap hover:text-rose-400 sm:gap-2 sm:px-3 sm:py-2",
                activeIndex === i &&
                  "font-sirin border-b-2 font-bold text-rose-400",
              )}
            >
              {cat.name}
              {isLoading && activeCategory == cat.name && (
                <PuffLoader size={12} color={RoseColor_1} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-1 overflow-hidden">
        <Activity mode={isLoading ? "visible" : "hidden"}>
          <div className="flex h-50 w-full items-center justify-center">
            <PuffLoader color={RoseColor_1} />
          </div>
        </Activity>
        <TrendingSlider
          swiperRef={swiperRef}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
          products={products || []}
        />
      </div>
    </div>
  );
};
export default TrendingSection;
