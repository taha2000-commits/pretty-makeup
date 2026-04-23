import type { Product } from "../../../types/product";
import { NoSwipeArea } from "./TrendingSlider";
import MakeupCard from "../../../components/MakeupCard";
import { useDraggable } from "react-use-draggable-scroll-safe";
import { useRef, type RefObject } from "react";

const ProductDraggableRow = ({ products }: { products: Product[] }) => {
  const ref = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const { events } = useDraggable(ref);
  return (
    <NoSwipeArea>
      <div
        className="scrollbar-hide flex w-full gap-5 overflow-x-scroll pt-10 pb-30"
        {...events}
        ref={ref}
      >
        {products.map((product, i) => (
          <div key={i} className="max-w-50 min-w-50">
            <MakeupCard product={product} />
          </div>
        ))}
      </div>
    </NoSwipeArea>
  );
};

export default ProductDraggableRow;
