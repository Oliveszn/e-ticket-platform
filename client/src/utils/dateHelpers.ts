////this func formats the date in explore page
export function formatEventDateTime(eventDate: string, eventTime: string) {
  const date = new Date(eventDate);
  const day = date.getDate();

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
  });

  const [hours, minutes] = eventTime.split(":").map(Number);
  date.setHours(hours, minutes);

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return {
    formattedDateTime: `${formattedDate} ${day}${getOrdinal(
      day
    )} · ${formattedTime}`,
    date,
    day,
    formattedDate,
    formattedTime,
  };
}
