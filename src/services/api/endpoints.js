export const API_ENDPOINTS = {
  auth: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    me: "/api/auth/me",
    forgotPassword: "/api/auth/forgot-password",
    resetPassword: "/api/auth/reset-password",
  },

  dashboard: {
    summary: "/api/dashboard/summary",
  },

  orders: {
    list: "/api/orders",
    details: (orderId) => `/api/orders/${orderId}`,
  },

  categories: {
    list: "/api/categories",
    create: "/api/categories",
    update: (categoryId) => `/api/categories/${categoryId}`,
    status: (categoryId) => `/api/categories/${categoryId}/status`,
    productLimit: (categoryId) => `/api/categories/${categoryId}/product-limit`,
  },

  users: {
    list: "/api/users",
    create: "/api/users",
    update: (userId) => `/api/users/${userId}`,
    remove: (userId) => `/api/users/${userId}`,
    status: (userId) => `/api/users/${userId}/status`,
  },

  vendors: {
    overview: "/api/vendors/overview",
    detail: (vendorId) => `/api/vendors/${vendorId}`,
    status: (vendorId) => `/api/vendors/${vendorId}/status`,
    requestDecision: (requestId) => `/api/vendors/requests/${requestId}/decision`,
    serviceRequestAssign: (requestId) =>
      `/api/vendors/service-requests/${requestId}/assign`,
    serviceRequestReject: (requestId) =>
      `/api/vendors/service-requests/${requestId}/reject`,
    payoutCommission: (payoutId) => `/api/vendors/payouts/${payoutId}/commission`,
    payoutRelease: (payoutId) => `/api/vendors/payouts/${payoutId}/release`,
  },

  payments: {
    summary: "/api/payments/summary",
    list: "/api/payments",
    invoice: (paymentId) => `/api/payments/${paymentId}/invoice`,
  },
};
