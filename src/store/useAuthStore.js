import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Week 15 Zustand Authentication Store
 * 
 * Note on backend authentication:
 * This project currently does not have an active backend authentication API endpoint
 * or server to issue verified cryptographically-signed JWTs.
 * For this Week 15 learning assignment, the `login` action simulates authentication
 * on the client side with a clearly-labeled demo session token.
 */
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      /**
       * Client-side demo login action
       * @param {Object} credentials
       * @param {string} credentials.email
       * @param {string} [credentials.name]
       */
      login: ({ email, name }) => {
        const fallbackName = email ? email.split("@")[0] : "Community Member";
        const displayName = name && name.trim() ? name.trim() : fallbackName;

        // Generate a simple demo token timestamped for the session
        const demoToken = `demo-token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

        const loggedInUser = {
          name: displayName,
          email: email || "user@example.com",
        };

        set({
          user: loggedInUser,
          token: demoToken,
          isAuthenticated: true,
        });

        return { success: true, user: loggedInUser };
      },

      /**
       * Logout action: resets user, token, and authentication state
       */
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "kulan-auth-storage", // Key used in browser localStorage
    }
  )
);

export default useAuthStore;
