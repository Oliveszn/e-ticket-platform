import { StagePassLogo } from "@/components/Stagepass-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleAlert, LockOpen } from "lucide-react";
import Link from "next/link";

const Register = () => {
  return (
    <div className="w-full max-w-lg space-y-6 bg-white shadow-lg rounded-xl p-8">
      <div className="flex flex-col items-center gap-2 my-6">
        <StagePassLogo size="large" />
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Create an account
        </h2>
      </div>

      <form className="space-y-5">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="firstName" className="">
              First Name
            </label>
            <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
              <Input
                id="firstName"
                type="text"
                placeholder="First Name"
                className="border-0 focus-visible:ring-0 py-4"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="lastName" className="">
              Last Name
            </label>
            <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
              <Input
                id="lastName"
                type="text"
                placeholder="Last Name"
                className="border-0 focus-visible:ring-0 py-4"
              />
            </div>
          </div>
        </div>
        <p className="text-xs font-medium text-gray-500">
          <CircleAlert className="size-5" />
          Your name should be your legal name, because this will be matched with
          your bank account for payouts.
        </p>

        {/* Business Name */}
        <div className="space-y-1">
          <label htmlFor="lastName" className="">
            Business Name
          </label>
          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <Input
              id="lastName"
              type="text"
              placeholder="Business / Display Name"
              className="border-0 focus-visible:ring-0 py-4"
            />
          </div>
          <p className="text-xs font-medium text-gray-500">
            This is your public display name, which can be your business name or
            a name you are popularly identified as.
          </p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="email" className="">
            Email
          </label>
          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border-0 focus-visible:ring-0 py-4"
            />
          </div>
        </div>

        {/* Number */}
        <div className="space-y-1">
          <label htmlFor="number" className="">
            Phone Number
          </label>
          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <Input
              id="number"
              type="tel"
              placeholder="Phone Number"
              className="border-0 focus-visible:ring-0 py-4"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1">
          <label htmlFor="address" className="">
            Address
          </label>
          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <Input
              id="address"
              type="text"
              placeholder="Address"
              className="border-0 focus-visible:ring-0 py-4"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label htmlFor="password" className="">
            Password
          </label>
          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border-0 focus-visible:ring-0 py-4"
            />
          </div>
          <p className="text-xs font-medium text-gray-500">
            Password should include lowercase, uppercase and symbols for maximum
            security.
          </p>
        </div>

        {/* Submit Button */}
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <LockOpen className="size-5" />
          Sign Up
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
