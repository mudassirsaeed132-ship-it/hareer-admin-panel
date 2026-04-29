import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../../services/api/endpoints";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const withBase = (path) => `${API_BASE}${path}`;

const userMock = {
  id: "admin-01",
  fullName: "Hareer Admin",
  email: "admin@hareer.test",
  role: "admin",
};

let session = null;

export const authHandlers = [
  http.post(withBase(API_ENDPOINTS.auth.login), async ({ request }) => {
    const payload = await request.json().catch(() => ({}));

    session = {
      token: "mock-token",
      user: {
        ...userMock,
        email: payload?.email || userMock.email,
      },
    };

    return HttpResponse.json(session);
  }),

  http.post(withBase(API_ENDPOINTS.auth.logout), async () => {
    session = null;
    return HttpResponse.json({ success: true });
  }),

  http.get(withBase(API_ENDPOINTS.auth.me), async () => {
    if (!session) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return HttpResponse.json(session.user);
  }),

  http.post(withBase(API_ENDPOINTS.auth.forgotPassword), async () => {
    return HttpResponse.json({ success: true });
  }),

  http.post(withBase(API_ENDPOINTS.auth.resetPassword), async () => {
    return HttpResponse.json({ success: true });
  }),
];

export default authHandlers;
