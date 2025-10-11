"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuthStatus } from "@/store/auth-slice";
import { clearTokenRefresh, startTokenRefreshCycle } from "@/utils/token-timer";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Only run checkAuthStatus on protected pages
  const isProtected =
    pathname.startsWith("/dashboard") || pathname.startsWith("/auth");

  const { data, isLoading } = useQuery({
    queryKey: ["authStatus"],
    queryFn: async () => {
      if (!isProtected) return null; // skip check on public pages
      return await dispatch(checkAuthStatus()).unwrap();
    },
    enabled: isProtected, ////only run when protected
    retry: false,
    staleTime: Infinity, // we never reftech cos the refresh cycle handles it
  });

  // Start/stop token refresh based on auth status
  useEffect(() => {
    if (isAuthenticated) {
      startTokenRefreshCycle();
    } else {
      clearTokenRefresh();
    }

    return () => clearTokenRefresh();
  }, [isAuthenticated]);

  if (isProtected && isLoading) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          <p className="text-sm text-gray-600">Please Wait...</p>
        </div>
      </div>
    );
  }

  // doesnt render anyting visible no need to return children
  return null;
}
