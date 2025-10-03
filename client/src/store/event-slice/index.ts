import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/utils/axios-interceptor";
import { AxiosError } from "axios";
import { FormSchema } from "@/utils/validationSchema";
import { EventResponse, EventState } from "@/utils/types";
import { base64ToFile } from "@/utils/helperFunction";

const initialState: EventState = {
  status: "idle",
  error: null,
  event: null,
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

export const createEvent = createAsyncThunk(
  "/create/event",
  async (form: FormSchema, { rejectWithValue }) => {
    try {
      const fd = new FormData();

      // append simple fields
      fd.append("title", form.title);
      fd.append("slug", form.slug);
      fd.append("eventDate", form.date);
      fd.append("eventTime", form.time);
      fd.append("category", form.category);
      fd.append("charge", form.charge);

      if (form.description) {
        fd.append("description", form.description);
      }

      // append nested venue (stringify it)
      fd.append("venue", JSON.stringify(form.venue));

      // append image file
      // Handle image - convert base64 back to File if needed
      if (form.image instanceof File) {
        fd.append("image", form.image);
      } else if (
        form.image &&
        typeof form.image === "object" &&
        "base64" in form.image
      ) {
        // Convert base64 back to File
        const imageFile = base64ToFile(
          form.image.base64,
          form.image.name,
          form.image.type
        );
        fd.append("image", imageFile);
      } else {
      }

      // append tickets array (stringify it)
      fd.append("tickets", JSON.stringify(form.tickets));
      const response = await axios.post<EventResponse>(
        `${apiUrl}/api/events/create`,
        fd,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    resetEvent: (state) => {
      state.status = "idle";
      state.error = null;
      state.event = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.event = action.payload.event;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetEvent } = eventSlice.actions;
export default eventSlice.reducer;
