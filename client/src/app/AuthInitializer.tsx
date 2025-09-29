"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuthStatus } from "@/store/auth-slice";
import { clearTokenRefresh, startTokenRefreshCycle } from "@/utils/token-timer";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["authStatus"],
    queryFn: () => dispatch(checkAuthStatus()).unwrap(),
    retry: false,
    staleTime: Infinity, // we never reftech cos the refresh cycle handles it
    refetchOnWindowFocus: true, // Recheck when user returns to tab
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  // Start/stop token refresh based on auth status
  useEffect(() => {
    if (isAuthenticated) {
      startTokenRefreshCycle();
    } else {
      clearTokenRefresh();
    }

    return () => {
      clearTokenRefresh();
    };
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          <p className="text-sm text-gray-600">Please Wait...</p>
        </div>
      </div>
    );
  }

  //   Handle auth failure
  //   if (isError || !data?.success) {
  //     router.push("/auth/login");
  //     return null;
  //   }

  // doesnt render anyting visible no need to return children
  return null;
}
