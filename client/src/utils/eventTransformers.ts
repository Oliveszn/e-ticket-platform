import { formatDateForInput } from "./formHelpers";
import { FormValues } from "./types";

export const transformApiEventToFormValues = (
  event: any
): Partial<FormValues> => {
  return {
    title: event.title || "",
    slug: event.slug || "",
    date: event.eventDate ? formatDateForInput(event.eventDate) : "",
    time: event.eventTime || "",
    venue: {
      name: event.venue.name || "",
      address: event.venue.address || "",
      city: event.venue.city || "",
      state: event.venue.state || "",
      isPublic: event.venue.isPublic ?? true,
    },
    charge: event.charge || "Host",
    category: event.category as FormValues["category"],
    description: event.description || "",
    image:
      typeof event.image === "object" &&
      event.image !== null &&
      "url" in event.image
        ? event.image.url
        : typeof event.image === "string"
        ? event.image
        : "",
    tickets: event.tickets || [],
  };
};
