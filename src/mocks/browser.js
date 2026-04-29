import { setupWorker } from "msw/browser";
import authHandlers from "./handlers/auth.handlers";
import dashboardHandlers from "./handlers/dashboard.handlers";
import ordersHandlers from "./handlers/orders.handlers";
import categoriesHandlers from "./handlers/categories.handlers";
import vendorsHandlers from "./handlers/vendors.handlers";
import usersHandlers from "./handlers/users.handlers";
import paymentsHandlers from "./handlers/payments.handlers";

export const worker = setupWorker(
  ...authHandlers,
  ...dashboardHandlers,
  ...ordersHandlers,
  ...categoriesHandlers,
  ...vendorsHandlers,
  ...usersHandlers,
  ...paymentsHandlers
);