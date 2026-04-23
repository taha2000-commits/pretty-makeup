import { lazy } from "react";
export const App = lazy(() => import("../../App"));
export const HomePage = lazy(() => import("../../pages/home/HomePage"));
export const LoginPage = lazy(() => import("../../pages/auth/login/LoginPage"));
export const SignupPage = lazy(
  () => import("../../pages/auth/signup/SignupPage"),
);
export const ResetPasswordPage = lazy(
  () => import("../../pages/auth/reset-password/ResetPasswordPage"),
);
export const AuthPage = lazy(() => import("../../pages/auth/AuthPage"));

export const ForgetPassword = lazy(
  () => import("../../pages/auth/forget-password/ForgetPassword"),
);
export const ProfilePage = lazy(
  () => import("../../pages/profile/ProfilePage"),
);
export const CartPage = lazy(() => import("../../pages/cart/CartPage"));
export const FavsPage = lazy(() => import("../../pages/favorites/FavsPage"));
export const Account = lazy(() => import("../../pages/profile/routes/Account"));
export const Orders = lazy(() => import("../../pages/profile/routes/Orders"));
export const Addresses = lazy(
  () => import("../../pages/profile/routes/Addresses"),
);
export const ProductPage = lazy(
  () => import("../../pages/product/ProductPage"),
);
export const ProductsPage = lazy(
  () => import("../../pages/products/ProductsPage"),
);
export const ProductTypesPage = lazy(
  () => import("../../pages/product-types/ProductTypesPage"),
);
export const TagsPage = lazy(() => import("../../pages/home/tags/TagsPage"));
export const BrandsPage = lazy(
  () => import("../../pages/home/brands/BrandsPage"),
);
