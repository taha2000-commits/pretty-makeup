import { createBrowserRouter } from "react-router";
import {
  AuthPage,
  ForgetPassword,
  HomePage,
  LoginPage,
  SignupPage,
  ProfilePage,
  Addresses,
  Orders,
  Account,
  CartPage,
  FavsPage,
  ProductPage,
  ProductTypesPage,
  TagsPage,
  BrandsPage,
  ProductsPage,
  ResetPasswordPage,
} from "./chunks";
import IndexRoute from "./ProtectedRoute";
import { FiltersContextProvider } from "../../context/filters-context/FiltersContextProvider";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: IndexRoute,
    children: [
      {
        path: "/",
        Component: HomePage,
        children: [
          {
            path: "/",
            Component: ProductTypesPage,
          },

          {
            path: "/categories",
            Component: ProductTypesPage,
          },
          {
            path: "/tags",
            Component: TagsPage,
          },
          {
            path: "/brands",
            Component: BrandsPage,
          },
        ],
      },
      {
        path: "/profile",
        Component: ProfilePage,
        children: [
          {
            path: "/profile/",
            Component: Account,
          },
          {
            path: "/profile/orders",
            Component: Orders,
          },
          {
            path: "/profile/addresses",
            Component: Addresses,
          },
        ],
      },
      {
        path: "/cart",
        Component: CartPage,
      },
      {
        path: "/favorites",
        Component: FavsPage,
      },
      {
        path: "/product/:productID",
        Component: ProductPage,
      },
      {
        path: "/products",
        Component: () => (
          <FiltersContextProvider>
            <ProductsPage />
          </FiltersContextProvider>
        ),
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthPage,
    children: [
      {
        path: "/auth/login/",
        Component: LoginPage,
      },
      {
        path: "/auth/signup",
        Component: SignupPage,
      },
      {
        path: "/auth/forget-password",
        Component: ForgetPassword,
      },
      {
        path: "/auth/reset-password",
        Component: ResetPasswordPage,
      },
    ],
  },
]);
