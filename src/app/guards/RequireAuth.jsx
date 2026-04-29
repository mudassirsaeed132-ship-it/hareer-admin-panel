import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../features/auth/model/authStore";
import { AUTH_PATHS } from "../router/paths";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Navigate
        to={AUTH_PATHS.LOGIN}
        replace
        state={{ from: location }}
      />
    );
  }

  return children || <Outlet />;
}
