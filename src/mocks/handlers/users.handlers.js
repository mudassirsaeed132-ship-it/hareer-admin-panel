import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../../services/api/endpoints";
import { usersListMock } from "../data/users.mock";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const withBase = (path) => `${API_BASE}${path}`;

let usersDb = [...usersListMock];

function formatDate(date = new Date()) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export const usersHandlers = [
  http.get(withBase(API_ENDPOINTS.users.list), async () => {
    return HttpResponse.json(usersDb);
  }),

  http.post(withBase(API_ENDPOINTS.users.create), async ({ request }) => {
    const payload = await request.json();

    const newUser = {
      id: `user-${Date.now()}`,
      fullName: payload.fullName,
      email: payload.email,
      status: payload.status,
      addedDate: formatDate(),
    };

    usersDb = [newUser, ...usersDb];

    return HttpResponse.json(newUser, { status: 201 });
  }),

  http.put(withBase("/api/users/:userId"), async ({ params, request }) => {
    const payload = await request.json();
    const userIndex = usersDb.findIndex((user) => user.id === params.userId);

    if (userIndex < 0) {
      return HttpResponse.json({ message: "User not found." }, { status: 404 });
    }

    const updatedUser = {
      ...usersDb[userIndex],
      fullName: payload.fullName,
      email: payload.email,
      status: payload.status,
    };

    usersDb[userIndex] = updatedUser;

    return HttpResponse.json(updatedUser);
  }),

  http.patch(withBase("/api/users/:userId/status"), async ({ params, request }) => {
    const payload = await request.json();
    const userIndex = usersDb.findIndex((user) => user.id === params.userId);

    if (userIndex < 0) {
      return HttpResponse.json({ message: "User not found." }, { status: 404 });
    }

    const updatedUser = {
      ...usersDb[userIndex],
      status: payload.status,
    };

    usersDb[userIndex] = updatedUser;

    return HttpResponse.json(updatedUser);
  }),

  http.delete(withBase("/api/users/:userId"), async ({ params }) => {
    const exists = usersDb.some((user) => user.id === params.userId);

    if (!exists) {
      return HttpResponse.json({ message: "User not found." }, { status: 404 });
    }

    usersDb = usersDb.filter((user) => user.id !== params.userId);

    return HttpResponse.json({ success: true });
  }),
];

export default usersHandlers;
