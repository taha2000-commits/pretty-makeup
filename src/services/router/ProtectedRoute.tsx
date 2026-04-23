import { Suspense, useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import { App } from "./chunks";
import { useUser } from "../../features/login/useUser";
import LoadingScreen from "../../pages/loading/LoadingScreen";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const nav = useNavigate();
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && user?.role !== "authenticated") nav("/auth/login");
  }, [user, nav, isLoading]);

  if (!isLoading && user?.role === "authenticated") return children;
};

const IndexRoute = () => (
  <Suspense fallback={<LoadingScreen />}>
    <ProtectedRoute>
      <App />
    </ProtectedRoute>
  </Suspense>
);

export default IndexRoute;
