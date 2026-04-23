import Tilt from "react-parallax-tilt";
import { Link } from "react-router";
import { useBrands } from "../../../features/brands/useBrands";

const BrandsPage = () => {
  const { data: brands } = useBrands();
  return (
    <div className="mt-15 mb-25">
      <div className="mb-15 grid gap-5">
        <h1 className="font-playwright text-center text-3xl font-bold text-rose-400 sm:text-start sm:text-4xl">
          Your Favorite Beauty Brands
        </h1>
        <h5 className="font-sirin text-center sm:text-start sm:text-lg">
          Discover trusted names loved by makeup artists and beauty enthusiasts
        </h5>
      </div>
      <div className="flex flex-wrap justify-center gap-0.5">
        {brands?.map((brand) => (
          <Tilt key={brand.id}>
            <Link
              key={brand.id}
              to={`/products?brand=${brand.name}`}
              state={brand}
            >
              <img loading="lazy" src={brand.logo_url} alt="" className="sm:w-auto w-20" />
            </Link>
          </Tilt>
        ))}
      </div>
    </div>
  );
};

export default BrandsPage;
