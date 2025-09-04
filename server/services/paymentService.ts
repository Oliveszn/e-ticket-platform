import axios from "axios";
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
  };

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
}

export async function verifyPayment(reference: string) {
  const response = await axios.get(
    `${process.env.PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  return response.data.data; // contains status, amount, etc.
}
