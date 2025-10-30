"use client";
import { StagePassLogo } from "@/components/common/Stagepass-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, RegisterSchema } from "@/utils/validationSchema";
import { useFormik } from "formik";
import { CircleAlert, LockOpen } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRegister } from "@/hooks/endpoints/useAuth";
import { PasswordRequirement } from "@/components/auth/PasswordRequirement";

const INITIAL_VALUES: RegisterSchema = {
  firstName: "",
  lastName: "",
  businessName: "",
  email: "",
  number: "",
  address: "",
  password: "",
};

const PASSWORD_REQUIREMENTS = [
  {
    key: "minLength",
    label: "At least 8 characters",
    test: (val: string) => val.length >= 8,
  },
  {
    key: "hasUpperCase",
    label: "One uppercase letter",
    test: (val: string) => /[A-Z]/.test(val),
  },
  {
    key: "hasLowerCase",
    label: "One lowercase letter",
    test: (val: string) => /[a-z]/.test(val),
  },
  {
    key: "hasNumber",
    label: "One number",
    test: (val: string) => /\d/.test(val),
  },
  {
    key: "hasSymbol",
    label: "One special character",
    test: (val: string) => /[@#^()\-_.,></?}{$!%*?&]/.test(val),
  },
] as const;
const Register = () => {
  ////password checks
  // const [passwordChecks, setPasswordChecks] = useState({
  //   minLength: false,
  //   hasLowerCase: false,
  //   hasUpperCase: false,
  //   hasNumber: false,
  //   hasSymbol: false,
  // });

  const formik = useFormik<RegisterSchema>({
    // initialValues: {
    //   firstName: "",
    //   lastName: "",
    //   businessName: "",
    //   email: "",
    //   number: "",
    //   address: "",
    //   password: "",
    // },
    initialValues: INITIAL_VALUES,
    validationSchema: toFormikValidationSchema(registerSchema),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  // const register = useRegister();
  const { mutate: register, isPending } = useRegister();
  const handleSubmit = async (data: RegisterSchema) => {
    register(data);
  };

  ///had to do this to manipulate formiks handlechaneg on password, just to get the inputs
  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;

  //   formik.handleChange(e);

  //   setPasswordChecks({
  //     minLength: value.length >= 8,
  //     hasUpperCase: /[A-Z]/.test(value),
  //     hasLowerCase: /[a-z]/.test(value),
  //     hasNumber: /\d/.test(value),
  //     hasSymbol: /[@#^()-_.,></?}{$!%*?&]/.test(value),
  //   });
  // };
  const getFieldError = (field: keyof RegisterSchema) => {
    return formik.touched[field] && formik.errors[field]
      ? formik.errors[field]
      : null;
  };

  const passwordChecks = useMemo(() => {
    const password = formik.values.password;
    // Dynamically generate checks object from PASSWORD_REQUIREMENTS array
    return PASSWORD_REQUIREMENTS.reduce(
      (acc, req) => ({
        ...acc,
        [req.key]: req.test(password), // Run test function for each requirement
      }),
      {} as Record<string, boolean>
    );
  }, [formik.values.password]);

  const isSubmitDisabled = isPending || !formik.isValid;
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
                aria-invalid={!!getFieldError("firstName")} // Accessibility
                aria-describedby={
                  getFieldError("firstName") ? "firstName-error" : undefined
                }
              />
            </div>
            {/* {formik.errors.firstName && formik.touched.firstName && (
              <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
            )} */}
            {getFieldError("firstName") && (
              <p
                id="firstName-error"
                className="text-red-500 text-sm"
                role="alert"
              >
                {getFieldError("firstName")}
              </p>
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
                aria-invalid={!!getFieldError("lastName")}
                aria-describedby={
                  getFieldError("lastName") ? "lastName-error" : undefined
                }
              />
            </div>
            {/* {formik.errors.lastName && formik.touched.lastName && (
              <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
            )} */}
            {getFieldError("lastName") && (
              <p
                id="lastName-error"
                className="text-red-500 text-sm"
                role="alert"
              >
                {getFieldError("lastName")}
              </p>
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
              aria-invalid={!!getFieldError("businessName")}
              aria-describedby="businessName-help"
            />
          </div>
          {/* {formik.errors.businessName && formik.touched.businessName && (
            <p className="text-red-500 text-sm">{formik.errors.businessName}</p>
          )} */}
          {getFieldError("businessName") && (
            <p className="text-red-500 text-sm" role="alert">
              {getFieldError("businessName")}
            </p>
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
              aria-invalid={!!getFieldError("email")}
              aria-describedby={
                getFieldError("email") ? "email-error" : undefined
              }
            />
          </div>
          {/* {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )} */}
          {getFieldError("email") && (
            <p id="email-error" className="text-red-500 text-sm" role="alert">
              {getFieldError("email")}
            </p>
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
              aria-invalid={!!getFieldError("number")}
              aria-describedby={
                getFieldError("number") ? "number-error" : undefined
              }
            />
          </div>
          {/* {formik.errors.number && formik.touched.number && (
            <p className="text-red-500 text-sm">{formik.errors.number}</p>
          )} */}
          {getFieldError("number") && (
            <p id="number-error" className="text-red-500 text-sm" role="alert">
              {getFieldError("number")}
            </p>
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
              aria-invalid={!!getFieldError("address")}
              aria-describedby={
                getFieldError("address") ? "address-error" : undefined
              }
            />
          </div>
          {/* {formik.errors.address && formik.touched.address && (
            <p className="text-red-500 text-sm">{formik.errors.address}</p>
          )} */}
          {getFieldError("address") && (
            <p id="address-error" className="text-red-500 text-sm" role="alert">
              {getFieldError("address")}
            </p>
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
              // onChange={handlePasswordChange}
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
          </div>
          {/* {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )} */}
          {getFieldError("password") && (
            <p className="text-red-500 text-sm" role="alert">
              {getFieldError("password")}
            </p>
          )}

          {/* Checklist UI */}
          {/* <div className="mt-2 space-y-1 text-sm">
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
          </div> */}
          <div
            id="password-requirements"
            className="mt-2 space-y-1 text-sm"
            role="list"
          >
            {PASSWORD_REQUIREMENTS.map((req) => (
              <PasswordRequirement
                key={req.key}
                isMet={passwordChecks[req.key]} // Using memoized value
                label={req.label}
              />
            ))}
          </div>

          <p className="text-xs font-medium text-gray-500">
            Password must include lowercase, uppercase and symbols for maximum
            security.
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitDisabled}
          className={`w-full text-white transition-colors ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isPending ? (
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

      <footer className="text-center text-base text-gray-600">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-600 hover:underline">
          Login instead
        </Link>
      </footer>
    </div>
  );
};

export default Register;
