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

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    ///////don't retry if it's the refresh endpoint itself failing else e go be infinte loop
    if (originalRequest.url?.includes("/refresh-token")) {
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
            return axios(originalRequest);
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
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        store.dispatch(logout());
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
