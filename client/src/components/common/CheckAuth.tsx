"use client";

import { useAppSelector } from "@/store/hooks";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { type ReactNode } from "react";

interface CheckAuthProps {
  children: ReactNode;
}

const CheckAuth = ({ children }: CheckAuthProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Don’t redirect until the auth check is complete
    // Once loading is done, handle redirects properly
    if (status === "succeeded") {
      if (!isAuthenticated && pathname.startsWith("/dashboard")) {
        router.replace("/auth/login");
      }
      if (isAuthenticated && pathname.startsWith("/auth")) {
        router.replace("/dashboard");
      }
    }
  }, [isAuthenticated, status, pathname, router]);

  if (status === "idle" || status === "loading") return null;

  return <>{children}</>;
};

export default CheckAuth;
