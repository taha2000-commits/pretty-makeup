import clsx from "clsx";
import { Link, Outlet, useLocation } from "react-router";
import { useLogout } from "../../features/logout/useLogout";
import { PuffLoader } from "react-spinners";

const ProfilePage = () => {
  const { pathname } = useLocation();
  const { logout, isPending } = useLogout();

  return (
    <div className="w-full">
      <div className="container mx-auto py-15">
        <div className="flex gap-2 px-5 pb-15 capitalize sm:px-10">
          <span className="">main</span>
          <span>|</span>
          <span className="">
            {pathname.split("/")[2] ? pathname.split("/")[2] : "account"}
          </span>
        </div>
        <div className="mx-5 mb-10 flex items-center justify-center rounded-2xl bg-white p-1 capitalize shadow-2xl sm:hidden">
          <Link
            to={"/profile/"}
            className={clsx(
              "w-fit rounded-2xl p-2",
              !pathname.split("/")[2] && "bg-gray-100",
            )}
          >
            account
          </Link>
          <Link
            to={"/profile/addresses"}
            className={clsx(
              "w-fit rounded-2xl p-2",
              pathname.split("/")[2] == "addresses" && "bg-gray-100",
            )}
          >
            addresses
          </Link>
          <Link
            to={"/profile/orders"}
            className={clsx(
              "w-fit rounded-2xl p-2",
              pathname.split("/")[2] == "orders" && "bg-gray-100",
            )}
          >
            orders
          </Link>
        </div>
        <div className="grid grid-cols-12 p-5 sm:gap-10 sm:p-10 md:gap-15 md:p-0">
          <div className="col-span-3 hidden h-fit flex-col rounded-4xl bg-white p-5 capitalize shadow-2xl sm:flex">
            <Link
              to={"/profile/"}
              className={clsx(
                "w-fit rounded-2xl p-2",
                !pathname.split("/")[2] && "bg-gray-100",
              )}
            >
              account
            </Link>
            <Link
              to={"/profile/addresses"}
              className={clsx(
                "w-fit rounded-2xl p-2",
                pathname.split("/")[2] == "addresses" && "bg-gray-100",
              )}
            >
              addresses
            </Link>
            <Link
              to={"/profile/orders"}
              className={clsx(
                "w-fit rounded-2xl p-2",
                pathname.split("/")[2] == "orders" && "bg-gray-100",
              )}
            >
              orders
            </Link>
            <div
              className={
                "flex w-fit cursor-pointer items-center gap-1 rounded-2xl p-2 hover:bg-gray-100"
              }
              onClick={() => logout()}
            >
              logout <PuffLoader loading={isPending} size={16} />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-9">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
