const AUTH_FLAG_KEY = "wasEverAuthenticated";

export const authTracker = {
  setAuthenticated: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_FLAG_KEY, "true");
    }
  },

  clearAuthenticated: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_FLAG_KEY);
    }
  },

  wasEverAuthenticated: (): boolean => {
    if (typeof window !== "undefined") {
      const result = localStorage.getItem(AUTH_FLAG_KEY) === "true";
      return result;
    }
    return false;
  },
};
