import { authApi } from "@/api/endpoints/auth";
import { setAuth } from "@/store/auth-slice";
import { store } from "@/store/store";

let refreshInterval: NodeJS.Timeout | null = null;
let isRefreshing = false;

const refreshTokens = async (): Promise<void> => {
  // Don't refresh if already refreshing
  if (isRefreshing) {
    return;
  }

  isRefreshing = true;

  try {
    const data = await authApi.refreshToken();

    if (data.user) {
      store.dispatch(setAuth({ user: data.user }));
    }
  } catch (error) {
    console.log("🔐 Silent refresh failed - user may need to login:", error);
    // Don't clear auth here - let the interceptor handle it
  } finally {
    isRefreshing = false;
  }
};

// Start the silent refresh service
export const startSilentRefresh = (): void => {
  // Clear any existing interval
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }

  // Refresh every 14 minutes (14 * 60 * 1000)
  refreshInterval = setInterval(() => {
    refreshTokens();
  }, 14 * 60 * 1000); // 14 minutes
};

// Stop the silent refresh service
export const stopSilentRefresh = (): void => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
};

// Export for testing and manual control
export const silentRefreshService = {
  start: startSilentRefresh,
  stop: stopSilentRefresh,
};
