import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import RequireAuth from "../guards/RequireAuth";
import RequireGuest from "../guards/RequireGuest";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import PageLoader from "../../shared/ui/PageLoader";
import {
  LoginPage,
  ForgotPasswordPage,
  EmailSentPage,
  ResetPasswordPage,
  DashboardPage,
  OrdersPage,
  CategoriesPage,
  VendorsPage,
  VendorDetailsPage,
  UsersPage,
  PaymentsPage,
} from "./lazyRoutes";
import { AUTH_PATHS, ADMIN_PATHS } from "./paths";

function withSuspense(element) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

const routeConfig = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: AUTH_PATHS.LOGIN,
        element: <RequireGuest>{withSuspense(<LoginPage />)}</RequireGuest>,
      },
      {
        path: AUTH_PATHS.FORGOT_PASSWORD,
        element: withSuspense(<ForgotPasswordPage />),
      },
      {
        path: AUTH_PATHS.EMAIL_SENT,
        element: withSuspense(<EmailSentPage />),
      },
      {
        path: AUTH_PATHS.RESET_PASSWORD,
        element: withSuspense(<ResetPasswordPage />),
      },
    ],
  },
  {
    path: ADMIN_PATHS.DASHBOARD,
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: withSuspense(<DashboardPage />),
      },
      {
        path: ADMIN_PATHS.ORDERS,
        element: withSuspense(<OrdersPage />),
      },
      {
        path: ADMIN_PATHS.CATEGORIES,
        element: withSuspense(<CategoriesPage />),
      },
      {
        path: ADMIN_PATHS.VENDORS,
        element: withSuspense(<VendorsPage />),
      },
      {
        path: `${ADMIN_PATHS.VENDORS}/:vendorId`,
        element: withSuspense(<VendorDetailsPage />),
      },
      {
        path: ADMIN_PATHS.USERS,
        element: withSuspense(<UsersPage />),
      },
      {
        path: ADMIN_PATHS.PAYMENTS,
        element: withSuspense(<PaymentsPage />),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ADMIN_PATHS.DASHBOARD} replace />,
  },
];

export default routeConfig;
