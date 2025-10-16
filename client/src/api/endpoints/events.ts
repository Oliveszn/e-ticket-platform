import {
  EventsListResponse,
  SingleEventResponse,
  TrendingEventsResponse,
} from "@/utils/types";
import apiClient from "../client";
import { base64ToFile } from "@/utils/helperFunction";
import { FormSchema } from "@/utils/validationSchema";

export const getPromoterEvent = async () => {
  const response = await apiClient.get<EventsListResponse>(
    `/api/events/my-events`
  );
  return response.data;
};

export const getPromoterSingleEvent = async (id: string) => {
  const response = await apiClient.get<SingleEventResponse>(
    `/api/events/my-event/${id}`
  );
  return response.data;
};

export const trackEventView = async (eventId: string) => {
  const response = await apiClient.post(
    `/api/events/${eventId}/track-view`,
    {},
    { withCredentials: true } // Important for cookies!
  );
  return response.data;
};

///FOR PUBLIC
export const getAllEvents = async ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  const response = await apiClient.get<EventsListResponse>(`/api/events`, {
    params: { page, limit },
  });
  return response.data;
};

export const getAnEvent = async ({ id }: { id: string }) => {
  const response = await apiClient.get<SingleEventResponse>(
    `/api/events/${id}`
  );
  return response.data;
};

export const getEventsByCategory = async ({
  category,
  page,
  limit,
}: {
  category: string;
  page?: number;
  limit?: number;
}) => {
  const response = await apiClient.get<EventsListResponse>(
    `/api/events/category`,
    { params: { category, page, limit } }
  );
  return response.data;
};

export const getTrendingEvents = async () => {
  const response = await apiClient.get<TrendingEventsResponse>(
    `/api/events/trending`
  );
  return response.data;
};

export const createEvent = async (form: FormSchema) => {
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

  // append nested venue (stringify)
  fd.append("venue", JSON.stringify(form.venue));

  // append image file
  if (form.image instanceof File) {
    fd.append("image", form.image);
  } else if (
    form.image &&
    typeof form.image === "object" &&
    "base64" in form.image
  ) {
    const imageFile = base64ToFile(
      form.image.base64,
      form.image.name,
      form.image.type
    );
    fd.append("image", imageFile);
  }

  // append tickets array
  fd.append("tickets", JSON.stringify(form.tickets));

  const response = await apiClient.post(`/api/events/create`, fd, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
