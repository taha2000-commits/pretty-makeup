import type {
  MouseEvent,
  PropsWithChildren,
  RefObject,
  TouchEvent,
} from "react";
import { A11y, EffectCoverflow, Pagination, Scrollbar } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductDraggableRow from "./ProductDraggableRow";
import type { Product } from "../../../types/product";

export const NoSwipeArea = ({ children }: PropsWithChildren) => {
  const stopSwipe = (e: TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const stopSwipeOnMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="no-swiping"
      onMouseDown={stopSwipeOnMouseDown}
      onTouchStart={stopSwipe}
      onTouchMove={stopSwipe}
    >
      {children}
    </div>
  );
};

const TrendingSlider = ({
  products,
  swiperRef,
  onSlideChange,
}: {
  products: Product[];
  swiperRef: RefObject<SwiperType | null>;
  onSlideChange?: (swiper: SwiperType) => void;
}) => {
  return (
    <Swiper
      modules={[Pagination, Scrollbar, A11y, EffectCoverflow]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      noSwiping={true}
      noSwipingClass="no-swiping"
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={onSlideChange}
      pagination={false}
      effect="coverflow"
      coverflowEffect={{
        rotate: 90,
        depth: 100,
        slideShadows: false,
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <SwiperSlide key={i}>
          <ProductDraggableRow products={products} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default TrendingSlider;
