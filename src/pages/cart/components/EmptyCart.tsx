import { Link } from "react-router";

const EmptyCart = () => {
  return (
    <div className="h-screen p-20 px-40">
      <h3 className="mb-5 text-6xl font-thin capitalize">My cart</h3>
      <div className="flex flex-col items-center justify-center capitalize">
        <img
          loading="lazy"
          src="/empty-cart.jpg"
          alt=""
          className="w-70 mix-blend-multiply"
        />
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <span className="text-6xl font-bold text-gray-400">
            your cart is empty
          </span>
          <Link
            to={"/"}
            className="text-rose-400 underline hover:text-rose-500"
          >
            Start shopping now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
