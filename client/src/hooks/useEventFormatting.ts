///this hook is to format the date and time in our slug page
import { useMemo } from "react";

export function useEventFormatting(eventDate?: string, eventTime?: string) {
  return useMemo(() => {
    if (!eventDate) {
      return {
        month: "",
        day: 0,
        formattedDate: "",
        formattedTime: "",
      };
    }

    const date = new Date(eventDate);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();

    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const monthShort = date.toLocaleDateString("en-US", { month: "short" });

    const getOrdinal = (n: number) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
    };

    const formattedDate = `${weekday} ${day}${getOrdinal(day)}, ${monthShort}`;

    const formattedTime = eventTime
      ? new Date(`1970-01-01T${eventTime}`).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : "";

    return { month, day, formattedDate, formattedTime };
  }, [eventDate, eventTime]);
}
