"use client";

import { useCheckAuth } from "@/hooks/endpoints/useAuth";
import { useAppSelector } from "@/store/hooks";
import { startSilentRefresh, stopSilentRefresh } from "@/utils/token-timer";
import { ReactNode, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isLoading } = useCheckAuth();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      // Start silent refresh when user is authenticated
      startSilentRefresh();
    } else {
      // Stop when user logs out
      stopSilentRefresh();
    }

    // Cleanup on unmount
    return () => {
      stopSilentRefresh();
    };
  }, [isAuthenticated]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}
