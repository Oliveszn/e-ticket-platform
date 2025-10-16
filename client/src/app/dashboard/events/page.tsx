"use client";
import { usePromoterEvents } from "@/hooks/useEvent";
import Link from "next/link";

const Events = () => {
  const { data, isLoading, isError, error } = usePromoterEvents();
  console.log(data);
  const events = data?.data.length;

  return (
    <main>
      <div className="space-y-8">
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-5"
          >
            <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
            <path
              fillRule="evenodd"
              d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="font-semibold text-xl capitalize">Events</span>
        </div>
        <div className="border rounded dark:border-gray-600 dark:bg-secondary-alt bg-white text-black dark:text-gray-50 undefined">
          <div className="space-y-3 p-3 sm:p-5">
            <p className="font-semibold">Events ({events})</p>
            <div className="border dark:border-gray-600 rounded flex flex-1 items-center gap-2 dark:text-white text-gray-800 text-sm px-3 max-w-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <input
                required
                className="bg-transparent w-full py-2 outline-0"
                placeholder="Search by event name, status..."
                type="text"
                value=""
                readOnly
              />
            </div>
          </div>
        </div>
        {data &&
          data?.data?.length > 0 &&
          data?.data?.map((eventData) => {
            const eventDate = new Date(eventData.eventDate);
            const formattedDate = eventDate.toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
            return (
              <div className="space-y-5" key={eventData?.slug}>
                <div className="border rounded dark:border-gray-600 dark:bg-secondary-alt bg-white text-black dark:text-gray-50 shadow-lg">
                  <div className="p-3 sm:p-5 divide-y-2 space-y-4">
                    <div className="flex justify-between gap-2 sm:gap-5">
                      <div className="flex sm:items-center gap-3">
                        <img
                          src={eventData?.image.url}
                          alt="event"
                          className="h-18 w-28 object-cover rounded"
                        />
                        <div className="space-y-2">
                          <p className="text-lg font-semibold capitalize">
                            {eventData.title}
                          </p>
                          <p className="text-sm">{eventData.description}</p>
                          <p className="text-xs">{formattedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="">
                          <div
                            role="menubar"
                            className="flex h-10 items-center space-x-1 rounded-md bg-white p-1 dark:bg-gray-700 outline-none"
                            data-orientation="horizontal"
                          >
                            <button
                              type="button"
                              role="menuitem"
                              id="radix-:r1:"
                              aria-haspopup="menu"
                              aria-expanded="false"
                              data-state="closed"
                              className="flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-gray-100 focus:text-gray-900 data-[state=open]:bg-gray-100 data-[state=open]:text-gray-900 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[state=open]:bg-gray-800 dark:data-[state=open]:text-gray-50"
                              data-orientation="horizontal"
                              data-radix-collection-item=""
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="h-8"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 pt-4">
                      <div className="flex gap-2 items-center sm:gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-full h-10 w-10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="dark:text-white h-6 w-6 text-blue-500"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-xs font-light">Status</span>
                          <b className="text-sm font-semibold capitalize">
                            {(() => {
                              const eventDateTime = new Date(
                                `${eventData.eventDate}T${eventData.eventTime}`
                              );
                              const now = new Date();

                              if (
                                eventDateTime.toDateString() ===
                                now.toDateString()
                              ) {
                                return "Today";
                              } else if (eventDateTime > now) {
                                return "Active";
                              } else {
                                return "Ended";
                              }
                            })()}
                          </b>
                        </div>
                      </div>
                      <div className="flex gap-2 sm:gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-full h-10 w-10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="dark:text-white h-6 w-6 text-blue-500"
                          >
                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
                            <path
                              fillRule="evenodd"
                              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-xs font-light">
                            Event Views
                          </span>
                          <b className="text-sm font-semibold">6</b>
                        </div>
                      </div>
                      <div className="flex gap-2 sm:gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-full h-10 w-10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="dark:text-white h-6 w-6 text-blue-500"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-xs font-light">
                            Ticket Sold{" "}
                          </span>
                          <b className="text-sm font-semibold">
                            {eventData?.tickets?.reduce(
                              (acc, ticket) => acc + ticket.sold,
                              0
                            )}
                          </b>
                        </div>
                      </div>
                      <div className="flex gap-2 sm:gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-full h-10 w-10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="dark:text-white h-6 w-6 text-blue-500"
                          >
                            <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z"></path>
                          </svg>
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-xs font-light">
                            Ticketing Password
                          </span>
                          <b className="text-sm font-semibold">obmih4g</b>
                        </div>
                      </div>
                    </div>
                    <div className="py-4 flex justify-between px-4">
                      <Link
                        href={`/events/${eventData.slug}`}
                        className="flex flex-row-reverse items-center justify-center gap-2 text-blue-500"
                      >
                        View Event{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-5 text-blue-500"
                        >
                          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
                          <path
                            fillRule="evenodd"
                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Link>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `${window.location.origin}/events/${eventData.slug}`
                          )
                        }
                        className="flex flex-row-reverse items-center justify-center gap-2 text-blue-500"
                      >
                        Share link{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-5 text-blue-500"
                        >
                          <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default Events;
