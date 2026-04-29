import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/model/authStore";
import { ADMIN_PATHS } from "../router/paths";

export default function RequireGuest({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ADMIN_PATHS.DASHBOARD} replace />;
  }

  return children || <Outlet />;
}

