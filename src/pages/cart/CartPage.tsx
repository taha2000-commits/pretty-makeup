import { useCart } from "../../features/cart/useCart";
import { AnnouncementBar } from "../home/AnnouncementBar";
import CartProduct from "./components/CartProduct";
import CartSummary from "./components/CartSummary";
import EmptyCart from "./components/EmptyCart";

const CartPage = () => {
  const { data: cart } = useCart();
  if (cart?.[0])
    return (
      <div className="relative">
        <div className="h-50vh sm:h-60vh bg-[url(/cart-bg.png)] bg-cover"></div>
        <AnnouncementBar />
        <div className="grid grid-cols-12 gap-y-10 p-5 md:gap-x-10 md:p-10 lg:p-20">
          <div className="col-span-full lg:col-span-8">
            <h3 className="mb-5 text-6xl font-thin capitalize">My cart</h3>
            <div className="grid gap-5">
              {cart?.map((product) => (
                <CartProduct key={product.id} product={product} />
              ))}
            </div>
          </div>
          <div className="col-span-full grid gap-5 lg:col-span-4">
         

            <CartSummary cart={cart || []} />
          </div>
        </div>
        <div
          className="rounded--full fixed top-1/4 -left-2 -translate-x-1/4 -rotate-90 cursor-pointer bg-black p-2 px-4 text-white select-none md:hidden"
          onClick={() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          summary
        </div>
      </div>
    );
  else return <EmptyCart />;
};

export default CartPage;


