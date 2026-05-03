import { HiOutlineHeart } from "react-icons/hi";
import { useAddToFavs } from "../features/favorites/useAddToFavs";
import { useRemoveFromFavs } from "../features/favorites/useRemoveFromFavs";
import type { Product } from "../types/product";
import clsx from "clsx";
import { GoPlus } from "react-icons/go";
import { useAddToCart } from "../features/cart/useAddToCart";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { generate8DigitNumber } from "../utils/helpers";
import { RoseColor_1, RoseColor_2 } from "../utils/constants";

const MakeupCard = ({
  product,
  isFav = false,
  isLoading = false,
}: {
  product: Product;
  isFav?: boolean;
  isLoading?: boolean;
}) => {
  const navigate = useNavigate();

  const { mutate: removeFromFavs, isPending: isPendingRemoveToFav } =
    useRemoveFromFavs();
  const { mutate: addToFavs, isPending: isPendingAddToFav } = useAddToFavs();
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  const handleToggleFav = () => {
    if (!isFav && !product.isFav)
      addToFavs({
        id: generate8DigitNumber(),
        isFav: true,
        product: product,
        product_id: product.id,
      });
    else removeFromFavs(product.id);
  };
  const handleAddToCart = () => {
    addToCart({
      id: generate8DigitNumber(),
      product: product,
      product_id: product.id,
      quantity: 1,
      selected_color: product.product_colors[0],
      total_price: parseFloat(product.price),
    });
  };
  return (
    <div className="shadow-3xl relative max-h-fit overflow-hidden rounded-3xl bg-white select-none">
      <div className="relative">
        <img
          loading="lazy"
          src={product.api_featured_image}
          alt=""
          className="h-50 w-full object-scale-down mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-transparent"></div>
        <div className="absolute top-0 right-0 rounded-bl-2xl bg-gray-100 p-3 text-rose-400">
          <div className="">
            {isPendingRemoveToFav || isPendingAddToFav ? (
              <PuffLoader
                loading={isPendingRemoveToFav || isPendingAddToFav}
                size={25}
                color={RoseColor_1}
              />
            ) : (
              <HiOutlineHeart
                size={25}
                className={clsx(
                  "cursor-pointer hover:fill-rose-400",
                  (isFav || product.isFav) && "fill-rose-400",
                )}
                onClick={handleToggleFav}
              />
            )}
          </div>
        </div>
      </div>
      <div className="p-2">
        <h6 className="text-gray-400">{product.brand}</h6>
        <h5
          className="relative cursor-pointer truncate text-lg font-medium capitalize hover:underline"
          onClick={() => {
            navigate(`/product/${product.id}`, {
              state: product,
              preventScrollReset: false,
            });
          }}
        >
          {product.name}
          <div className="absolute inset-0 bg-linear-to-l from-white from-0% to-transparent to-90%"></div>
        </h5>
        <div className="my-2 flex items-center justify-between">
          <div className="flex items-end gap-1">
            <span className="text-sm font-bold">
              {(product.price_sign || "$") + product.price}
            </span>
            <span className="text-xs line-through">$15</span>
          </div>
          <div
            className="cursor-pointer rounded-full bg-rose-400 p-2 text-white"
            onClick={handleAddToCart}
          >
            {isAddingToCart ? (
              <PuffLoader loading={isAddingToCart} size={16} color="#ffffff" />
            ) : (
              <GoPlus />
            )}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "absolute inset-0 flex origin-center scale-0 items-center justify-center bg-white/50 opacity-0 transition-all duration-200",
          isLoading && "scale-100 opacity-100",
        )}
      >
        <PuffLoader loading={isLoading} color={RoseColor_2} size={100} />
      </div>
    </div>
  );
};
export default MakeupCard;
