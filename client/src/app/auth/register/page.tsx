"use client";
import { StagePassLogo } from "@/components/common/Stagepass-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/store/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerSchema, RegisterSchema } from "@/utils/validationSchema";
import { useFormik } from "formik";
import { CircleAlert, LockOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "sonner";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status } = useAppSelector((state) => state.auth);
  const isLoading = status === "loading";
  ////password checks
  const [passwordChecks, setPasswordChecks] = useState({
    minLength: false,
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSymbol: false,
  });

  const formik = useFormik<RegisterSchema>({
    initialValues: {
      firstName: "",
      lastName: "",
      businessName: "",
      email: "",
      number: "",
      address: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(registerSchema),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (data: RegisterSchema) => {
    console.log(data);
    try {
      const result = await dispatch(registerUser(data)).unwrap();

      toast.success(result.message || "Registration Successful");
      formik.resetForm();
      router.push("/dashboard");
    } catch (error) {
      const message =
        typeof error === "string" ? error : "An unexpected error occurred";
      toast.error(message);
    }
  };

  ///had to do this to manipulate formiks handlechaneg on password, just to get the inputs
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    formik.handleChange(e);

    setPasswordChecks({
      minLength: value.length >= 8,
      hasUpperCase: /[A-Z]/.test(value),
      hasLowerCase: /[a-z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSymbol: /[@#^()-_.,></?}{$!%*?&]/.test(value),
    });
  };

  return (
    <div className="w-full max-w-lg space-y-6 bg-white shadow-lg rounded-xl p-8">
      <div className="flex flex-col items-center gap-2 my-6">
        <StagePassLogo size="large" />
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Create an account
        </h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="">
              First Name
            </Label>
            <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                className="border-0 focus-visible:ring-0 py-4"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.firstName && formik.touched.firstName && (
              <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="">
              Last Name
            </Label>
            <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
              <Input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="border-0 focus-visible:ring-0 py-4"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.lastName && formik.touched.lastName && (
              <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
            )}
          </div>
        </div>
        <p className="text-xs flex items-center gap-4 font-medium text-gray-500">
          <CircleAlert className="size-7" />
          Your name should be your legal name, because this will be matched with
          your bank account for payouts.
        </p>

        {/* Business Name */}
        <div className="space-y-2">
          <Label htmlFor="businessName" className="">
            Business Name
          </Label>
          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <Input
              id="businessName"
              type="text"
              name="businessName"
              placeholder="Business / Display Name"
              className="border-0 focus-visible:ring-0 py-4"
              onChange={formik.handleChange}
              value={formik.values.businessName}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.businessName && formik.touched.businessName && (
            <p className="text-red-500 text-sm">{formik.errors.businessName}</p>
          )}
          <p className="text-xs font-medium text-gray-500">
            This is your public display name, which can be your business name or
            a name you are popularly identified as.
          </p>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="">
            Email
          </Label>
          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
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

        {/* Number */}
        <div className="space-y-2">
          <Label htmlFor="number" className="">
            Phone Number
          </Label>
          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <Input
              id="number"
              type="tel"
              name="number"
              placeholder="Phone Number"
              className="border-0 focus-visible:ring-0 py-4"
              onChange={formik.handleChange}
              value={formik.values.number}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.number && formik.touched.number && (
            <p className="text-red-500 text-sm">{formik.errors.number}</p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="">
            Address
          </Label>
          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <Input
              id="address"
              type="text"
              name="address"
              placeholder="Address"
              className="border-0 focus-visible:ring-0 py-4"
              onChange={formik.handleChange}
              value={formik.values.address}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.address && formik.touched.address && (
            <p className="text-red-500 text-sm">{formik.errors.address}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="">
            Password
          </Label>
          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="border-0 focus-visible:ring-0 py-4"
              // onChange={formik.handleChange}
              onChange={handlePasswordChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}

          {/* Checklist UI */}
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  passwordChecks.minLength ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
              <span
                className={`transition-colors duration-200 ${
                  passwordChecks.minLength ? "text-green-700" : "text-gray-600"
                }`}
              >
                At least 8 characters
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  passwordChecks.hasUpperCase ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
              <span
                className={`transition-colors duration-200 ${
                  passwordChecks.hasUpperCase
                    ? "text-green-700"
                    : "text-gray-600"
                }`}
              >
                One uppercase letter
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  passwordChecks.hasLowerCase ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
              <span
                className={`transition-colors duration-200 ${
                  passwordChecks.hasLowerCase
                    ? "text-green-700"
                    : "text-gray-600"
                }`}
              >
                One lowercase letter
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  passwordChecks.hasNumber ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
              <span
                className={`transition-colors duration-200 ${
                  passwordChecks.hasNumber ? "text-green-700" : "text-gray-600"
                }`}
              >
                One number
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  passwordChecks.hasSymbol ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
              <span
                className={`transition-colors duration-200 ${
                  passwordChecks.hasSymbol ? "text-green-700" : "text-gray-600"
                }`}
              >
                One special character
              </span>
            </div>
          </div>

          <p className="text-xs font-medium text-gray-500">
            Password must include lowercase, uppercase and symbols for maximum
            security.
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || !formik.isValid}
          className={`w-full text-white transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating Account...
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <LockOpen className="size-5" />
              Sign Up
            </div>
          )}
        </Button>
      </form>

      <p className="text-center text-base text-gray-600">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-600 hover:underline">
          Login instead
        </Link>
      </p>
    </div>
  );
};

export default Register;
