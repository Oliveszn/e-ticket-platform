"use client";
import AppSidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { checkAuthStatus } from "@/store/auth-slice";

// export const metadata: Metadata = {
//   title: "Dashboard",
// };

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: () => dispatch(checkAuthStatus()).unwrap(),
    retry: false,
    staleTime: 1000 * 60, // 1 minute
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  // Handle auth failure
  if (isError || !data?.success) {
    router.push("/auth/login");
    return null;
  }
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
