// had to add this to conditionally render footer so not to come up in auth pages
"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Hide footer on auth pages
  if (pathname.startsWith("/auth") || pathname.startsWith("/dashboard")) {
    return null;
  }

  return <Footer />;
}
