import { Link } from "react-router";
import { MakeupArea } from "../types/enums";
import { GoPerson } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";
import { MdFavoriteBorder } from "react-icons/md";
import { useUserStats } from "../features/login/useUserStats";
import { LuLogOut } from "react-icons/lu";
import { useLogout } from "../features/logout/useLogout";

const Navbar = () => {
  const { data: userStats } = useUserStats();
  const { logout } = useLogout();

  return (
    <div className="grid grid-cols-12 grid-rows-2 gap-y-4 bg-white px-5 py-3 pb-2 sm:grid-rows-1 sm:px-20 sm:pb-3">
      <Link
        to={"/"}
        className="font-playwright col-span-2 text-xl font-bold text-rose-400"
      >
        Pretty
      </Link>
      <div className="col-span-full row-span-1 row-start-2 flex items-center justify-center bg-rose-400 text-white sm:col-span-8 sm:col-start-3 sm:row-start-1 sm:bg-transparent sm:text-inherit">
        <ul className="flex w-full items-center justify-between px-4 text-sm capitalize sm:justify-center sm:gap-4">
          <li>
            <Link
              to={"/products"}
              className="hover:text-rose-400 hover:underline"
            >
              all makeup
            </Link>
          </li>
          {MakeupArea.FACE && (
            <li>
              <Link
                to={"/products?area=face"}
                className="hover:underline sm:hover:text-rose-400"
              >
                Face
              </Link>
            </li>
          )}
          {MakeupArea.EYES && (
            <li>
              <Link
                to={"/products?area=eyes"}
                className="hover:underline sm:hover:text-rose-400"
              >
                Eyes
              </Link>
            </li>
          )}
          {MakeupArea.LIPS && (
            <li>
              <Link
                to={"/products?area=lips"}
                className="hover:underline sm:hover:text-rose-400"
              >
                Lips
              </Link>
            </li>
          )}
          {MakeupArea.CHEEKS && (
            <li>
              <Link
                to={"/products?area=cheeks"}
                className="hover:underline sm:hover:text-rose-400"
              >
                Cheeks
              </Link>
            </li>
          )}
          {MakeupArea.NAILS && (
            <li>
              <Link
                to={"/products?area=nails"}
                className="hover:underline sm:hover:text-rose-400"
              >
                Nails
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="col-span-10 flex items-center justify-end gap-4 sm:col-span-2">
        <Link
          to={"/favorites"}
          className="relative hover:fill-rose-400 hover:text-rose-400"
        >
          <MdFavoriteBorder size={20} />
          {Boolean(userStats?.favs_count) && (
            <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-400 text-xs text-white">
              {userStats?.favs_count}
            </div>
          )}
        </Link>
        <Link to={"/cart"} className="relative hover:text-rose-400">
          <GiShoppingCart size={20} />
          {Boolean(userStats?.cart_count) && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-400 text-xs text-white">
              {userStats?.cart_count}
            </span>
          )}
        </Link>
        <Link to={"/profile"} className="hover:text-rose-400">
          <GoPerson size={20} />
        </Link>
        <div
          className="cursor-pointer hover:text-rose-400"
          onClick={() => logout()}
        >
          <LuLogOut size={18} />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
