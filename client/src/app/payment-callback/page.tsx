"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { verifyTicketPurchase } from "@/store/order-slice";

export default function PaymentCallbackPage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const reference = searchParams.get("reference");

  const { status, success, error, order } = useAppSelector(
    (state) => state.payment
  );

  useEffect(() => {
    if (reference) {
      console.log("Verifying payment with reference:", reference);
      dispatch(verifyTicketPurchase(reference));
    }
  }, [dispatch, reference]);

  useEffect(() => {
    if (success && order) {
      // navigate to a success page
      console.log("Payment verified, redirecting to success page");
      router.push("/payment-success");
    }
  }, [success, order, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-3">
        <p className="text-red-500 text-lg font-semibold">
          Payment verification failed
        </p>
        <p className="text-gray-600">{error}</p>
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
