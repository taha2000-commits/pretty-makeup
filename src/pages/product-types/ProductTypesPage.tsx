import clsx from "clsx";
import { Link } from "react-router";
import { useProductTypes } from "../../features/product-types/useProductTypes";

const ProductTypesPage = () => {
  const { data } = useProductTypes();

  return (
    <div className="mt-15 sm:mb-70">
      <div className="grid gap-5">
        <h1 className="font-playwright text-center text-3xl font-bold text-rose-400 sm:text-start sm:text-4xl">
          Discover Your Glow
        </h1>
        <h5 className="font-sirin text-center sm:text-start sm:text-lg">
          Explore makeup essentials tailored to every style, mood, and moment
        </h5>
      </div>
      <div className="mt-20 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-10">
        {Array.from({ length: 5 }, (_, i) => i).map((element) => (
          <div
            key={element}
            className={clsx(
              "grid gap-5",
              element % 2 !== 0 && "translate-y-1/9",
            )}
          >
            {data?.slice(0 + element * 4, 4 + element * 4).map((cat) => (
              <div
                key={cat.id}
                className={clsx(
                  "font-sekuya xs:text-xl relative text-white",
                  cat.name.length > 6 ? "text-sm" : "text-lg",
                )}
              >
                <Link
                  to={`/products?type=${cat.name}`}
                  state={cat}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer whitespace-nowrap hover:underline"
                >
                  {cat.name}
                </Link>
                <img
                  loading="lazy"
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTypesPage;
