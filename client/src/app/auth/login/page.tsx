import { StagePassLogo } from "@/components/Stagepass-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Aperture, Chrome, KeyRound, LockOpen, Mail } from "lucide-react";
import Link from "next/link";

const Login = () => {
  return (
    <div className="w-full max-w-lg space-y-6 bg-white shadow-lg rounded-xl p-8">
      <div className="flex flex-col items-center gap-2 my-6">
        <StagePassLogo size="large" />
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Login to your account
        </h2>
      </div>

      {/* Form */}
      <form className="space-y-4 py-4">
        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="email" className="">
            Email
          </label>
          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <Mail className="mx-3 text-gray-400 size-5" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border-0 focus-visible:ring-0 py-4"
            />
          </div>
        </div>

        {/* // Password */}
        <div className="space-y-1">
          <label htmlFor="password" className="">
            Password
          </label>
          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <KeyRound className="mx-3 text-gray-400 size-5" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border-0 focus-visible:ring-0 py-4"
            />
          </div>
        </div>

        {/* Login button */}
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
          <LockOpen className="size-5" />
          Sign In
        </Button>

        {/* OR divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Sign in with Google */}
        <Button className="w-full flex items-center gap-2 bg-[#EF4444] hover:bg-red-500">
          <Aperture className="size-5 " />
          Sign in with Google
        </Button>
      </form>

      {/* Sign up link */}
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link href="/auth/register" className="text-blue-600 hover:underline">
          Sign up instead
        </Link>
      </p>

      {/* Forgot password */}
      <div className="text-center">
        <Link
          href="/auth/forgot-password"
          className="text-base text-black-600 hover:underline"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
