import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginRequest, logoutRequest } from "../api/authApi";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (payload) => {
        set({ isLoading: true, error: null });

        try {
          const response = await loginRequest(payload);

          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return response;
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || "Login failed",
          });

          throw error;
        }
      },

      logout: async () => {
        await logoutRequest();

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearAuthError: () => {
        set({ error: null });
      },
    }),
    {
      name: "hareer-admin-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);