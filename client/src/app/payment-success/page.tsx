"use client";

import { useVerifyTicketPurchase } from "@/hooks/useOrder";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const {
    data: verifyData,
    isPending,
    isError,
    error,
  } = useVerifyTicketPurchase(reference ?? "");

  // Handle loading / missing reference
  if (!reference) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Missing payment reference.</p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading payment details...</p>
      </div>
    );
  }

  if (isError || !verifyData?.success) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-3">
        <p className="text-red-500 text-lg font-semibold">
          Could not verify payment
        </p>
        <p className="text-gray-600">
          {error instanceof Error ? error.message : "Something went wrong."}
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800"
        >
          Go Home
        </button>
      </div>
    );
  }

  const order = verifyData?.data?.order;

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
