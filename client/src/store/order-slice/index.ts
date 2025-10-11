import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "@/api/client";
import { AxiosError } from "axios";
import { TicketPurchaseSchema } from "@/utils/validationSchema";
import { PaymentState } from "@/utils/types";

const initialState: PaymentState = {
  status: "idle",
  error: null,
  success: false,
  paymentUrl: null,
  reference: null,
  orderId: null,
  order: null,
};

const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const purchaseTickets = createAsyncThunk(
  "tickets/purchaseTickets",
  async (
    {
      id,
      ticketId,
      form,
    }: { id: string; ticketId: string; form: TicketPurchaseSchema },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post(
        `${apiUrl}/api/tickets/events/${id}/tickets/${ticketId}/purchase`,
        form
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const verifyTicketPurchase = createAsyncThunk(
  "tickets/verifyPurchase",
  async (reference: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        `${apiUrl}/api/tickets/events/verify-purchase`,
        { params: { reference } }
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.status = "loading";
      state.error = null;
      state.success = false;
      state.paymentUrl = null;
      state.reference = null;
      state.orderId = null;
    },
  },
  extraReducers: (builder) => {
    // Initialize Payment
    builder
      .addCase(purchaseTickets.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.success = false;
      })
      .addCase(purchaseTickets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.success = true;
        state.paymentUrl = action.payload.data.paymentUrl;
        state.reference = action.payload.data.reference;
        state.orderId = action.payload.data.orderId;
        state.order = action.payload.data || null;
      })
      .addCase(purchaseTickets.rejected, (state, action) => {
        console.error("Purchase rejected:", action.payload);
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Verify Payment

      .addCase(verifyTicketPurchase.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyTicketPurchase.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.success = true;
        state.order = action.payload.data?.order || null;
      })
      .addCase(verifyTicketPurchase.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
