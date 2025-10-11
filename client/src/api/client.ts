///this thunk is to et our refreshtoken thunk and we call it in our app/layout.tsx
///plus this will be used throuhout our slices
import axios from "axios";
// import { store } from "@/store/store";
import { logout, refreshTokenThunk } from "@/store/auth-slice";

let store: any; // will be injected later

// Helper to inject the store after it's created
export const injectStore = (_store: any) => {
  store = _store;
};

// Create axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true, // Important for refresh token cookies
});

let isRefreshing = false;

////here we create a queue that stores falied requests with 401 while refreshing token
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

///here we loop through queued requests, if the fail we reject them, but instances where they suceed we resolve they retey
const processQueue = (error: any) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  ///this one is to clear the queue
  failedQueue = [];
};

///Request interceptors also added auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

///Response interceptors where auth refresh is handled
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    ///////don't retry if it's the refresh endpoint itself failing else e go be infinte loop
    if (
      originalRequest.url?.includes("/refresh-token") &&
      error.response?.status === 401
    ) {
      store.dispatch(logout());
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }

    ///if its a 401 and we havent retired before the atempt to refresh again
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          ////but if theres a request in progress we push to the queue
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      ///here we call the endpoint to refreshtoken
      ///if it succeds clear the queue then retey the original request
      ///if not redirect to login and logout
      try {
        await store.dispatch(refreshTokenThunk()).unwrap();
        processQueue(null);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        store.dispatch(logout());
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle network errors
    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        error.message = "Request timeout. Please check your connection.";
      } else if (error.message === "Network Error") {
        error.message = "No internet connection. Please check your network.";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
