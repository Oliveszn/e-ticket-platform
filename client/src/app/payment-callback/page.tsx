"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyTicketPurchase } from "@/hooks/endpoints/useOrder";

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  const {
    data: verifyData,
    isPending: isVerifying,
    isSuccess,
    isError,
    error,
  } = useVerifyTicketPurchase(reference ?? "");

  useEffect(() => {
    if (isSuccess && verifyData?.success) {
      router.push(`/payment-success?reference=${reference}`);
    }
  }, [isSuccess, verifyData, router]);

  if (!reference) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Missing payment reference.
      </div>
    );
  }

  if (isVerifying) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-3">
        <p className="text-red-500 text-lg font-semibold">
          Payment verification failed
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

  return (
    <div className="flex justify-center items-center h-screen text-lg">
      Processing your payment...
    </div>
  );
}
