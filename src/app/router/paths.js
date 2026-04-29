export const ROUTE_SEGMENTS = {
  dashboard: "",
  orders: "orders",
  categories: "categories",
  vendors: "vendors",
  users: "users",
  payments: "payments",
};

export const AUTH_PATHS = {
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  EMAIL_SENT: "/email-sent",
  RESET_PASSWORD: "/reset-password",
};

export const ADMIN_PATHS = {
  DASHBOARD: "/",
  ORDERS: `/${ROUTE_SEGMENTS.orders}`,
  CATEGORIES: `/${ROUTE_SEGMENTS.categories}`,
  VENDORS: `/${ROUTE_SEGMENTS.vendors}`,
  USERS: `/${ROUTE_SEGMENTS.users}`,
  PAYMENTS: `/${ROUTE_SEGMENTS.payments}`,
};

export const PATHS = {
  dashboard: ADMIN_PATHS.DASHBOARD,
  orders: ADMIN_PATHS.ORDERS,
  categories: ADMIN_PATHS.CATEGORIES,
  vendors: ADMIN_PATHS.VENDORS,
  vendorDetails: (vendorId) => `${ADMIN_PATHS.VENDORS}/${vendorId}`,
  users: ADMIN_PATHS.USERS,
  payments: ADMIN_PATHS.PAYMENTS,
};
