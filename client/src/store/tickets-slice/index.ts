import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/utils/axios-interceptor";
import { AxiosError } from "axios";
import {
  SingleTicketResponse,
  TicketResponse,
  TicketState,
} from "@/utils/types";

const initialState: TicketState = {
  status: "idle",
  error: null,
  data: null,
  currentTicket: null,
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

export const getTickets = createAsyncThunk(
  "tickets/getByEventId",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<TicketResponse>(
        `${apiUrl}/api/tickets/events/${id}`
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getSingleTickets = createAsyncThunk(
  "tickets/getSingleTicket",
  async (
    { id, ticketId }: { id: string; ticketId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get<SingleTicketResponse>(
        `${apiUrl}/api/tickets/events/${id}/ticket/${ticketId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      ///GETTING TICKETS
      .addCase(getTickets.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload.data;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      ///GETTING SINGLE TICKETS
      .addCase(getSingleTickets.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSingleTickets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.currentTicket = action.payload.data;
      })
      .addCase(getSingleTickets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default ticketSlice.reducer;
