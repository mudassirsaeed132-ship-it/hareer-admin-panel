import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import AppProviders from "./app/providers/AppProviders";
import "./index.css";

function renderApp() {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>
  );
}

function isMockingEnabled() {
  const flag = String(import.meta.env.VITE_ENABLE_MSW || "")
    .trim()
    .toLowerCase();

  if (flag === "false" || flag === "0" || flag === "off") {
    return false;
  }

  return import.meta.env.DEV || flag === "true";
}

async function enableMocking() {
  if (!isMockingEnabled()) return;

  if (!("serviceWorker" in navigator)) {
    console.warn("MSW: Service workers are not supported in this browser.");
    return;
  }

  const { worker } = await import("./mocks/browser");

  await worker.start({
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
    onUnhandledRequest: "bypass",
  });
}

async function bootstrap() {
  try {
    await enableMocking();
  } catch (error) {
    console.error("MSW failed to start:", error);
  } finally {
    renderApp();
  }
}

bootstrap();