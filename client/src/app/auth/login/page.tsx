"use client";
import { StagePassLogo } from "@/components/common/Stagepass-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginSchema, loginSchema } from "@/utils/validationSchema";
import { useFormik } from "formik";
import { Aperture, KeyRound, LockOpen, Mail } from "lucide-react";
import Link from "next/link";
import { toFormikValidationSchema } from "zod-formik-adapter";

const Login = () => {
  const formik = useFormik<LoginSchema>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <div className="w-full max-w-lg space-y-6 bg-white shadow-lg rounded-xl p-8">
      <div className="flex flex-col items-center gap-2 my-6">
        <StagePassLogo size="large" />
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Login to your account
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-4 py-4">
        {/* Email */}
        <div className="space-y-1">
          <Label htmlFor="email" className="">
            Email
          </Label>
          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <Mail className="mx-3 text-gray-400 size-5" />
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="border-0 focus-visible:ring-0 py-4"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        {/* // Password */}
        <div className="space-y-1">
          <Label htmlFor="password" className="">
            Password
          </Label>
          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <KeyRound className="mx-3 text-gray-400 size-5" />
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="border-0 focus-visible:ring-0 py-4"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        {/* Login button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
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
