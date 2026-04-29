import { useLocation, useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../constants/auth.constants";
import { getRedirectPath } from "../utils/auth.helpers";
import { useAuthStore } from "../model/authStore";

export function useAuthFlow() {
  const navigate = useNavigate();
  const location = useLocation();

  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const clearAuthError = useAuthStore((state) => state.clearAuthError);

  const redirectAfterLogin = () => {
    navigate(getRedirectPath(location), { replace: true });
  };

  const goToLogin = () => {
    navigate(AUTH_ROUTES.login);
  };

  const goToForgotPassword = () => {
    navigate(AUTH_ROUTES.forgotPassword);
  };

  const goToEmailSent = (email) => {
    navigate(`${AUTH_ROUTES.emailSent}?email=${encodeURIComponent(email)}`);
  };

  const goToResetPassword = () => {
    navigate(AUTH_ROUTES.resetPassword);
  };

  return {
    login,
    logout,
    isLoading,
    error,
    clearAuthError,
    redirectAfterLogin,
    goToLogin,
    goToForgotPassword,
    goToEmailSent,
    goToResetPassword,
  };
}