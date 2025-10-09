import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/utils/axios-interceptor";
import { AxiosError } from "axios";
import { FormSchema } from "@/utils/validationSchema";
import {
  EventsListResponse,
  EventState,
  SingleEventResponse,
  TrendingEventsResponse,
} from "@/utils/types";
import { base64ToFile } from "@/utils/helperFunction";

const initialState: EventState = {
  status: "idle",
  error: null,
  data: null,
  currentEvent: null,
  trendingEvents: null,
  promoterEvents: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
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
      const response = await axios.post(`${apiUrl}/api/events/create`, fd, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// export const getAllEvents = createAsyncThunk(
//   "/get/events",
//   async (
//     params: { page?: number; limit?: number } = {},
//     { rejectWithValue }
//   ) => {
//     try {
//       const { page = 1, limit = 10 } = params;
//       const response = await axios.get<EventsListResponse>(
//         `${apiUrl}/api/events`,
//         { params: { page, limit } }
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(handleApiError(error));
//     }
//   }
// );

export const getAllEvents = async ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  const response = await axios.get<EventsListResponse>(`${apiUrl}/api/events`, {
    params: { page, limit },
  });
  return response.data;
};

export const getAnEvent = createAsyncThunk(
  "/get/event",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<SingleEventResponse>(
        `${apiUrl}/api/events/${id}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getTrendingEvents = createAsyncThunk(
  "/trending",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<TrendingEventsResponse>(
        `${apiUrl}/api/events/trending`
      );
      console.log(response);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// export const getEventsByCategory = createAsyncThunk(
//   "/get/events/category",
//   async (
//     params: { category: string; page?: number; limit?: number },
//     { rejectWithValue }
//   ) => {
//     try {
//       const { category, page = 1, limit = 10 } = params;
//       const response = await axios.get<EventsListResponse>(
//         `${apiUrl}/api/events/category`,
//         { params: { category, page, limit } }
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(handleApiError(error));
//     }
//   }
// );

export const getEventsByCategory = async ({
  category,
  page,
  limit,
}: {
  category: string;
  page?: number;
  limit?: number;
}) => {
  const response = await axios.get<EventsListResponse>(
    `${apiUrl}/api/events/category`,
    { params: { category, page, limit } }
  );
  return response.data;
};

// GET ALL EVENTS FOR PROMOTER (requires auth)
export const getPromoterEvents = createAsyncThunk(
  "/get/promoter/events",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<TrendingEventsResponse>(
        `${apiUrl}/api/events/promoter`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// GET SINGLE EVENT FOR PROMOTER (requires auth)
export const getPromoterSingleEvent = createAsyncThunk(
  "/get/promoter/event",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<SingleEventResponse>(
        `${apiUrl}/api/events/promoter/${id}`,
        {
          withCredentials: true,
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
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      ///CREATING EVENTS
      .addCase(createEvent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload.data;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      ///GETTING ALL EVENTS
      // .addCase(getAllEvents.pending, (state) => {
      //   state.status = "loading";
      //   state.error = null;
      // })
      // .addCase(getAllEvents.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.data = action.payload.data;
      //   state.pagination = action.payload.pagination;
      // })
      // .addCase(getAllEvents.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.payload as string;
      // })

      ///GETTING SINGLE EVENT
      .addCase(getAnEvent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAnEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentEvent = action.payload.data;
      })
      .addCase(getAnEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      ////GETTING TRENDING EVENT
      .addCase(getTrendingEvents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTrendingEvents.fulfilled, (state, action) => {
        state.trendingEvents = action.payload.data;
        state.status = "succeeded";
      })
      .addCase(getTrendingEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      ////CATEGORY EVENTS
      // .addCase(getEventsByCategory.pending, (state) => {
      //   state.status = "loading";
      //   state.error = null;
      // })
      // .addCase(getEventsByCategory.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.data = action.payload.data;
      //   state.pagination = action.payload.pagination;
      // })
      // .addCase(getEventsByCategory.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.payload as string;
      // })

      ///GETTING EVENTS FOR PROMOTERS
      .addCase(getPromoterEvents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPromoterEvents.fulfilled, (state, action) => {
        state.promoterEvents = action.payload.data;
        state.status = "succeeded";
      })
      .addCase(getPromoterEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      ///GETTING SINGLE EVENTS FOR PROMOTERS
      .addCase(getPromoterSingleEvent.fulfilled, (state, action) => {
        state.currentEvent = action.payload.data;
        state.status = "succeeded";
      });
  },
});

export const { resetEvent } = eventSlice.actions;
export default eventSlice.reducer;
