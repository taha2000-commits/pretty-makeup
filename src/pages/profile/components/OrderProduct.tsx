import clsx from "clsx";
import type { Color, Product } from "../../../types/product";

interface OrderProductProps {
  product: Product;
  quantity: number;
  selected_color: Color;
}

const OrderProduct = ({
  product,
  quantity,
  selected_color,
}: OrderProductProps) => {
  return (
    <div
      key={product.id}
      className="group relative flex gap-5 rounded-4xl bg-white p-5 shadow-2xl"
    >
      <div className="aspect-square w-25 overflow-hidden rounded-3xl border-8 border-gray-100 bg-gray-200">
        <img
          loading="lazy"
          src={product.api_featured_image}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full justify-between capitalize">
        <div className="flex flex-col justify-between">
          <div className="">
            <h6 className="text-lg font-medium">
              <span className="">{product.name}</span>
            </h6>
            {product.brand && (
              <p className="text-sm font-thin text-gray-400 italic">
                by: {product.brand}
              </p>
            )}
            {selected_color && (
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="hidden sm:block">
                  color: {selected_color.colour_name}
                </span>
                <span
                  className={clsx(
                    `block aspect-square w-7 rounded-xl border-4 border-white shadow-2xs`,
                  )}
                  style={{
                    backgroundColor: selected_color.hex_value,
                  }}
                ></span>
              </div>
            )}
          </div>
          <p className="text-sm">qty: {quantity || 1}</p>
        </div>
        <div className="">
          <span className="">
            {(product.price_sign || "$") + product.price}
          </span>
        </div>
      </div>
      <div className="absolute top-0 left-5 flex -translate-y-1/2 gap-2">
        {product.product_type && (
          <span className="h-fit rounded-2xl bg-rose-400 p-1 px-2 text-xs text-white sm:text-sm">
            {product.product_type.split("_").join(" ")}
          </span>
        )}
        {product.category && (
          <span className="h-fit rounded-2xl bg-rose-400 p-1 px-2 text-xs text-white sm:text-sm">
            {product.category}
          </span>
        )}
      </div>
    </div>
  );
};
export default OrderProduct;
