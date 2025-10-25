"use client";

import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./AuthInitializer";
import { injectStore } from "@/api/client";
import CheckAuth from "@/components/common/CheckAuth";

injectStore(store);

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount, error: any) => {
              // Don't retry on 401 errors
              if (error?.response?.status === 401) {
                return false;
              }
              return failureCount < 1;
            },
            staleTime: 30000, // 30 seconds
          },
          mutations: {
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <CheckAuth>{children}</CheckAuth>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default Providers;
