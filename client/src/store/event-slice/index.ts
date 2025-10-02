import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/utils/axios-interceptor";
import { AxiosError } from "axios";
import { FormSchema } from "@/utils/validationSchema";
import { EventResponse } from "@/utils/types";

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

      // append tickets array (stringify it)
      fd.append("tickets", JSON.stringify(form.tickets));

      // append image file
      fd.append("image", form.image);
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
