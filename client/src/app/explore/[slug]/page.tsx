"use client";
import Countdown from "@/components/explore/CountDown";
import { Button } from "@/components/ui/button";
import { useGetAnEvent } from "@/hooks/endpoints/useEvent";
import { useTickets } from "@/hooks/endpoints/useTickets";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const EventDetails = () => {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;
  const {
    data: currentEvent,
    isLoading: isEventLoading,
    isError: isEventError,
  } = useGetAnEvent(slug);
  console.log(currentEvent);

  const eventId = currentEvent?.data._id as string;
  const {
    data: ticket,
    isLoading: isTicketsLoading,
    isError: isTicketsError,
  } = useTickets(eventId || "", {
    enabled: !!eventId,
  });

  const date = new Date(currentEvent?.data?.eventDate || "");
  // Get month name
  const month = date.toLocaleString("default", { month: "long" });

  // Get day
  const day = date.getDate();

  const event = currentEvent?.data;

  const formattedDate = event?.eventDate
    ? (() => {
        const date = new Date(event.eventDate);

        const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
        const month = date.toLocaleDateString("en-US", { month: "short" });
        const day = date.getDate();

        // ordinal suffix (st, nd, rd, th)
        const getOrdinal = (n: number) => {
          const s = ["th", "st", "nd", "rd"];
          const v = n % 100;
          return s[(v - 20) % 10] || s[v] || s[0];
        };

        return `${weekday} ${day}${getOrdinal(day)}, ${month}`;
      })()
    : "";

  const formattedTime = event?.eventTime
    ? new Date(`1970-01-01T${event.eventTime}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  if (isEventLoading || isTicketsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isEventError || isTicketsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error Loading event and tickets
        </div>
        <button
          onClick={() => router.push("/explore")}
          className="mt-4 text-blue-600 hover:underline"
        >
          ← Back to events
        </button>
      </div>
    );
  }
  return (
    <main className="px-6 sm:px-8 lg:px-10 py-16">
      <div className="max-w-6xl mx-auto">
        {/* HEADER  */}
        <div className="flex gap-4 sm:gap-6 mb-4">
          <div className="text-center">
            <div className="bg-blue-600 rounded-t sm:text-xl py-2 px-4 text-white">
              {month}
            </div>
            <div className="text-xl sm:text-3xl rounded-b py-3 bg-white">
              {day}
            </div>
          </div>
          <div className="flex gap-4 sm:gap-6 md:w-3/4">
            <div className="flex flex-col gap-4">
              <p className="text-2xl sm:text-3xl font-bold capitalize">
                {currentEvent?.data.title}
              </p>
              <div className="flex text-xs gap-2 sm:text-sm items-center sm:gap-4">
                <div className="hidden sm:flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 sm:h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    ></path>
                  </svg>

                  {currentEvent?.data.venue.isPublic && (
                    <span>
                      {currentEvent?.data.venue.name}
                      {currentEvent?.data.venue.address},{" "}
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 sm:h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    ></path>
                  </svg>
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 sm:h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>{formattedTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LEFT CONTENT  */}
        <div className="grid sm:grid-cols-12 gap-4">
          <div className="sm:col-span-8 space-y-4">
            <div className="relative bg-blue-100 h-72 sm:h-[36rem] w-full">
              {currentEvent?.data.image?.url ? (
                <img
                  src={currentEvent?.data.image.url}
                  alt={currentEvent?.data.title}
                  className="rounded absolute w-full h-full inset-0 object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <svg
                    className="w-24 h-24 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="border rounded bg-white text-black undefined">
              <div className="">
                <p className="sm:text-lg font-semibold p-5 border-b font-harabara">
                  About Event
                </p>
                <p className="p-5 text-xs sm:text-sm">
                  {currentEvent?.data.description}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT  */}
          <div className="sm:col-span-4 hidden sm:block space-y-5">
            <div className="bg-white dark:bg-secondary-alt border rounded">
              <p className="p-5 border-b font-bold sm:text-lg font-harabara">
                Event Details
              </p>
              <div className="p-5 space-y-8">
                <Countdown eventDate={currentEvent?.data.eventDate || ""} />
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-50 dark:bg-blue-500 rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-7 dark:text-white text-blue-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <span className="text-gray-500 dark:text-gray-200 text-xs sm:text-sm">
                      Organised by
                    </span>
                    <p className="font-semibold sm:text-base capitalize">
                      afrospook
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-50 dark:bg-blue-500 rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-7 dark:text-white text-blue-500"
                    >
                      <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                      <path
                        fillRule="evenodd"
                        d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <span className="text-gray-500 dark:text-gray-200 text-xs sm:text-sm">
                      Date and Time
                    </span>
                    <p className="font-semibold sm:text-base capitalize">
                      {formattedDate}, {formattedTime}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-50 dark:bg-blue-500 rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-7 dark:text-white text-blue-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <span className="text-gray-500 dark:text-gray-200 text-xs sm:text-sm">
                      Location
                    </span>
                    <p className="font-semibold sm:text-base capitalize">
                      {currentEvent?.data.venue.name}
                      {currentEvent?.data.venue.address},{" "}
                      {currentEvent?.data.venue.city},{" "}
                      {currentEvent?.data.venue.state}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-secondary-alt sticky top-28 border rounded">
              <p className="p-5 border-b font-bold sm:text-lg font-harabara">
                Tickets
              </p>
              <div className="px-5 divide-y">
                {ticket?.data.map((ticket, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-4 gap-8"
                  >
                    <div className="flex gap-4">
                      <div>
                        <p className="capitalize">{ticket.name}</p>
                        <p className="text-lg font-bold text-blue-600 flex items-center gap-2">
                          <span>
                            <span>
                              <span>₦</span>
                              {ticket.price.toLocaleString()}
                            </span>
                          </span>
                        </p>
                        <small className="text-gray-500 dark:text-gray-300 text-xs">
                          {ticket.description}
                        </small>
                      </div>
                    </div>

                    <div className="">
                      {ticket.available === 0 ? (
                        <Button
                          className="cursor-not-allowed bg-gray-200 whitespace-nowrap"
                          size="sm"
                          variant="secondary"
                        >
                          Sold Out
                        </Button>
                      ) : (
                        <Link
                          href={`/explore/${slug}/ticket/${ticket.id}`}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 bg-blue-500 text-white hover:bg-blue-500/90 h-10 px-4 py-2 cursor-pointer"
                        >
                          Select
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetails;
