import { lazy } from "react";

export const LoginPage = lazy(() =>
  import("../../features/auth/pages/LoginPage")
);

export const ForgotPasswordPage = lazy(() =>
  import("../../features/auth/pages/ForgotPasswordPage")
);

export const EmailSentPage = lazy(() =>
  import("../../features/auth/pages/EmailSentPage")
);

export const ResetPasswordPage = lazy(() =>
  import("../../features/auth/pages/ResetPasswordPage")
);

export const DashboardPage = lazy(() =>
  import("../../features/dashboard/pages/DashboardPage")
);

export const OrdersPage = lazy(() =>
  import("../../features/orders/pages/OrdersPage")
);

export const CategoriesPage = lazy(() =>
  import("../../features/categories/pages/CategoriesPage")
);

export const VendorsPage = lazy(() =>
  import("../../features/vendors/pages/VendorsPage")
);

export const VendorDetailsPage = lazy(() =>
  import("../../features/vendors/pages/VendorDetailsPage")
);

export const UsersPage = lazy(() =>
  import("../../features/users/pages/UsersPage")
);

export const PaymentsPage = lazy(() =>
  import("../../features/payments/pages/PaymentsPage")
);
