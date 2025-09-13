import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Auth | StagePass",
  description: "Login or register to continue",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex items-center w-full">
      <div className="hidden lg:block h-full w-1/2 relative">
        <Image
          src="/auth.jpg"
          alt="welcome image"
          fill
          className="object-cover object-center"
          sizes="(min-width:1024px) 50vw, 100vw"
          // width={730}
          // height={650}
          // style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      <div className="flex flex-1 flex-col h-full justify-start items-center px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
