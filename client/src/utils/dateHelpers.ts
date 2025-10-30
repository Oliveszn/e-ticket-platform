////this func formats the date in explore page
export function formatEventDateTime(eventDate: string, eventTime: string) {
  const date = new Date(eventDate);
  const day = date.getDate();

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  // const formattedDate = date.toLocaleDateString("en-US", {
  //   weekday: "short",
  //   month: "short",
  // });
  // Extract weekday and month separately to control the order
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });

  const [hours, minutes] = eventTime.split(":").map(Number);
  date.setHours(hours, minutes);

  const formattedTime = date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      // minute: "2-digit",
      hour12: true,
    })
    .replace(" ", "")
    .toUpperCase();

  const formattedDateTime = `${weekday}, ${month} ${day}${getOrdinal(
    day
  )}, ${formattedTime}`;

  return {
    // formattedDateTime: `${formattedDate} ${day}${getOrdinal(
    //   day
    // )} · ${formattedTime}`,
    formattedDateTime,
    date,
    day,
    weekday,
    month,
    // formattedDate,
    formattedTime,
  };
}
