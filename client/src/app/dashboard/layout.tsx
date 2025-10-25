"use client";
import AppSidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Dashboard",
// };

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
