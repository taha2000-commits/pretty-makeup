import { Link, Outlet, useLocation, useNavigate } from "react-router";
import Button from "../../components/Button";
import { useBrands } from "../../features/brands/useBrands";
import Tilt from "react-parallax-tilt";
import { useProductTypes } from "../../features/product-types/useProductTypes";
import TrendingSection from "./components/TrendingSection";
import clsx from "clsx";
import { AnnouncementBar } from "./AnnouncementBar";

const HomePage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: brands } = useBrands();
  const { data: productsTypes } = useProductTypes();

  return (
    <div className="">
      <div className="h-60vh">
        <div className="relative flex min-h-full items-end justify-center bg-[url(/makeup-tools.jpg)] bg-cover pb-10">
          <div className="bg-opacity-50 absolute top-0 left-0 h-full w-full bg-rose-500/20"></div>
          <div className="z-1 flex flex-col items-center p-2 text-center text-white">
            <h1 className="font-playwright text-4xl font-black capitalize sm:text-5xl md:text-7xl lg:text-8xl">
              glow like never before
            </h1>
            <h4 className="font-sirin p-5 font-black text-gray-100 sm:text-xl md:text-2xl">
              Carefully selected products for a perfect everyday look.
            </h4>
            <Button className="mt-10" onClick={() => navigate("/products")}>
              shop now!
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <AnnouncementBar />

        <div className="container mx-auto grid grid-cols-6">
          <div className="text-md col-span-5 flex flex-col justify-center gap-3 bg-gray-200 p-7 sm:col-span-3 sm:p-10">
            <h4 className="font-sekuya text-xl font-black sm:text-3xl md:text-4xl">
              Weekly Beauty Deal! 🔥
            </h4>
            <p className="list-item">
              Enjoy a different discount coupon every week on your favorite
              makeup products 💄
            </p>

            <div className="font-playwright text-rose-400">
              🛍️ Stay tuned for fresh offers every week!
            </div>
          </div>
          <div className="text-md col-span-5 col-start-2 flex flex-col justify-center gap-3 bg-gray-100 p-7 sm:col-span-3 sm:p-10">
            <h4 className="font-sekuya text-xl font-black sm:text-3xl md:text-4xl">
              Free Delivery Offer!🚚
            </h4>
            <p className="list-item">
              Enjoy free shipping on orders over{" "}
              <span className="font-sirin text-lg font-bold text-rose-400">
                $50
              </span>{" "}
              💄
            </p>

            <div className="font-playwright text-rose-400">
              Shop your favorites and save on delivery!
            </div>
          </div>
        </div>
        <div className="group overflow-hidden">
          <div className="animate-marquee flex-row-revers flex flex-nowrap justify-center group-hover:[animation-play-state:paused]">
            {brands?.map((brand) => (
              <Tilt key={brand.id}>
                <Link to={`/brands/${brand.name}`}>
                  <img
                    loading="lazy"
                    src={brand.logo_url}
                    alt=""
                    className="min-w-25 sm:min-w-30"
                  />
                </Link>
              </Tilt>
            ))}
          </div>
        </div>
        <TrendingSection productsTypes={productsTypes || []} />
        <div className="sticky top-0 z-1 bg-pink-600 pt-1">
          <div className="sm:text-md container mx-auto flex items-center justify-center text-sm text-white capitalize sm:justify-start">
            <Link
              to={"/categories"}
              className={clsx(
                "px-5 py-2 hover:bg-white hover:text-rose-400 sm:px-10",
                (pathname == "/" || pathname == "/categories") &&
                  "font-sirin bg-white font-bold text-rose-400",
              )}
            >
              categories
            </Link>
            <Link
              to={"/brands"}
              className={clsx(
                "px-5 py-2 hover:bg-white hover:text-rose-400 sm:px-10",
                pathname == "/brands" &&
                  "font-sirin bg-white font-bold text-rose-400",
              )}
            >
              brands
            </Link>
            <Link
              to={"/tags"}
              className={clsx(
                "px-5 py-2 hover:bg-white hover:text-rose-400 sm:px-10",
                pathname == "/tags" &&
                  "font-sirin bg-white font-bold text-rose-400",
              )}
            >
              tags
            </Link>
          </div>
        </div>
        <div className="w-full">
          <div className="bg-full container mx-auto h-full p-5 md:p-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
