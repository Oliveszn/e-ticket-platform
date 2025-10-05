import { store } from "@/store/store";
import { refreshTokenThunk } from "@/store/auth-slice";

let refreshTimer: NodeJS.Timeout | null = null;
let isRefreshing = false;

// Refresh token every 14 minutes (access token expires in 15)
export const setupTokenRefresh = () => {
  clearTokenRefresh();
  refreshTimer = setInterval(async () => {
    const state = store.getState();
    if (state.auth.isAuthenticated && !isRefreshing) {
      isRefreshing = true;
      try {
        await store.dispatch(refreshTokenThunk()).unwrap();
      } catch (error) {
        clearTokenRefresh();
      } finally {
        isRefreshing = false;
      }
    }
  }, 14 * 60 * 1000); // 14 minutes
};

export const clearTokenRefresh = () => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
  isRefreshing = false;
};

export const startTokenRefreshCycle = () => {
  clearTokenRefresh(); // Clear any existing timer
  setupTokenRefresh();
};
