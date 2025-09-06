import axios from "axios";
import logger from "../utils/logger";
export interface PaymentInitResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export async function initializePayment(
  email: string,
  amountInNaira: number,
  metadata: any = {}
): Promise<PaymentInitResponse> {
  const amountInKobo = amountInNaira * 100; // Paystack expects amount in Kobo

  const payload = {
    email,
    amount: amountInKobo,
    metadata,
    callback_url: `${process.env.CLIENT_BASE_URL}/payment-callback`,
  };

  try {
    const response = await axios.post(
      `${process.env.PAYSTACK_BASE_URL}/transaction/initialize`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data; // contains authorization_url, reference, etc.
  } catch (error: any) {
    logger.error(
      "Paystack initialization error:",
      error.response?.data || error.message
    );
    throw new Error("Payment initialization failed");
  }
}

export async function verifyPayment(reference: string) {
  try {
    const response = await axios.get(
      `${process.env.PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return response.data.data; // contains status, amount, etc.
  } catch (error: any) {
    console.error(
      "Paystack verification error:",
      error.response?.data || error.message
    );
    throw new Error("Payment verification failed");
  }
}
