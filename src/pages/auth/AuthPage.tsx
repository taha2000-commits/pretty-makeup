import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useUser } from "../../features/login/useUser";

const AuthPage = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && user?.role === "authenticated") nav("/");
  }, [user, nav, isLoading]);

  if (!isLoading && user?.role !== "authenticated")
    return (
      <div className="relative flex min-h-screen w-screen items-center justify-center overflow-hidden p-5 sm:h-screen sm:max-h-screen sm:py-60">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="col-span-1 flex h-full items-center justify-center">
            <Outlet />
          </div>
          <div className="hidden items-center justify-center md:flex">
            <div className="relative aspect-square w-3/4 overflow-hidden rounded-4xl border-15 border-white shadow-2xl">
              <img
                loading="lazy"
                src="/login-img.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute top-0 left-0 h-10 w-1/5 rounded-br-4xl bg-white shadow-2xl"></div>
              <div className="absolute right-0 bottom-0 h-10 w-1/5 rounded-tl-4xl bg-white shadow-2xl"></div>
              <div className="font-sekuya absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold tracking-widest text-white/80 capitalize md:text-8xl">
                {pathname.split("/")[2]}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AuthPage;
