"use client";

import { useAppSelector } from "@/store/hooks";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { type ReactNode } from "react";

interface CheckAuthProps {
  isAuthenticated: boolean;

  children: ReactNode;
}

const CheckAuth = ({ isAuthenticated, children }: CheckAuthProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    // Only redirect after auth check is complete
    if (status === "succeeded") {
      // Not authenticated, trying to access restricted areas
      if (!isAuthenticated && pathname.startsWith("/dashboard")) {
        router.replace("/");
        return;
      }

      // If authenticated and trying to access auth pages
      if (
        isAuthenticated &&
        (pathname.startsWith("/auth/login") ||
          pathname.startsWith("/auth/register"))
      ) {
        router.replace("/dashboard");
        return;
      }
    }
  }, [isAuthenticated, pathname, router, status]);

  return <>{children}</>;
};

export default CheckAuth;
