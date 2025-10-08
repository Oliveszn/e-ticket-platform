"use client";

import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { order } = useAppSelector((state) => state.payment);

  useEffect(() => {
    // If no order in state, redirect home
    if (!order) {
      router.push("/");
    }
  }, [order, router]);

  // Show loading state while checking
  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold text-green-600 mb-3">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-700 mb-6">
          Your tickets for <strong>{order.eventTitle}</strong> are confirmed.
        </p>

        <div className="text-left space-y-2 text-gray-600">
          <p>
            <strong>Order Number:</strong> {order.orderNumber}
          </p>
          <p>
            <strong>Total Paid:</strong> ₦{order.totalAmount}
          </p>
          <p>
            <strong>Status:</strong> {order.orderStatus}
          </p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-6 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
