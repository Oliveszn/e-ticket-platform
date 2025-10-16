"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuthStatus, refreshTokenThunk } from "@/store/auth-slice";
import { clearTokenRefresh, startTokenRefreshCycle } from "@/utils/token-timer";
import { usePathname, useRouter } from "next/navigation";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export default function AuthInitializer({ children }: AuthInitializerProps) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { isAuthenticated, status } = useAppSelector((state) => state.auth);

  // Only run checkAuthStatus on protected pages
  const isProtected =
    pathname.startsWith("/dashboard") || pathname.startsWith("/auth");

  useEffect(() => {
    dispatch(refreshTokenThunk())
      .unwrap()
      .then(() => {
        dispatch(checkAuthStatus());
      })
      .catch(() => {});
  }, [dispatch]);

  // Start/stop token refresh based on auth status
  useEffect(() => {
    if (isAuthenticated) {
      startTokenRefreshCycle();
    } else {
      clearTokenRefresh();
    }

    return () => clearTokenRefresh();
  }, [isAuthenticated]);

  if (status === "loading") {
    return null;
  }

  return <>{children}</>;
}
