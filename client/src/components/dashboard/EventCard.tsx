"use client";

import { Event } from "@/utils/types";
import Link from "next/link";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Separator } from "@radix-ui/react-separator";
import { useEditEvent } from "@/hooks/endpoints/useEvent";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const eventDate = new Date(event.eventDate);
  const formattedDate = eventDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="space-y-5">
      <div className="border rounded bg-white text-black shadow-lg">
        <div className="p-3 sm:p-5 divide-y-2 space-y-4">
          <div className="flex justify-between gap-2 sm:gap-5">
            <div className="flex sm:items-center gap-3">
              <img
                src={event?.image.url}
                alt="event"
                className="h-18 w-28 object-cover rounded"
              />
              <div className="space-y-2">
                <p className="text-lg font-semibold capitalize">
                  {event.title}
                </p>
                <p className="text-sm">{event.description}</p>
                <p className="text-xs">{formattedDate}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Popover>
                <div className="">
                  <div
                    role="menubar"
                    className="flex h-10 items-center space-x-1 rounded-md bg-white p-1 outline-none"
                    data-orientation="horizontal"
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        role="menuitem"
                        id="radix-:r1:"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        data-state="closed"
                        className="flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-gray-100 focus:text-gray-900 data-[state=open]:bg-gray-100 data-[state=open]:text-gray-900"
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
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      sideOffset={8}
                      className="w-48 bg-white rounded-lg shadow-lg border border-slate-200 p-2"
                    >
                      <Link href={`/dashboard/events/${event._id}`}>
                        <div className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-gray-100 hover:bg-slate-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="mr-2 size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>
                          <p>Manage Event</p>
                        </div>
                      </Link>
                      <Separator />
                      <Link href={""}>
                        <div className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-gray-100 hover:bg-slate-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="mr-2 size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                            ></path>
                          </svg>
                          <p>Ticket Sale</p>
                        </div>
                      </Link>
                      <Separator />
                      <Link href={""}>
                        <div className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-gray-100 hover:bg-slate-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 size-5"
                            aria-hidden="true"
                          >
                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                            <path d="M5 3v4"></path>
                            <path d="M19 17v4"></path>
                            <path d="M3 5h4"></path>
                            <path d="M17 19h4"></path>
                          </svg>
                          <p>Coupons</p>
                        </div>
                      </Link>
                      <Separator />
                    </PopoverContent>
                  </div>
                </div>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 pt-4">
            <div className="flex gap-2 items-center sm:gap-4">
              <div className="bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6 text-blue-500"
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
                      `${event.eventDate}T${event.eventTime}`
                    );
                    const now = new Date();

                    if (eventDateTime.toDateString() === now.toDateString()) {
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
              <div className="bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6 text-blue-500"
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
                <span className="text-xs font-light">Event Views</span>
                <b className="text-sm font-semibold">6</b>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <div className="bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6 text-blue-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-light">Ticket Sold </span>
                <b className="text-sm font-semibold">
                  {event?.tickets?.reduce(
                    (acc, ticket) => acc + ticket.sold,
                    0
                  )}
                </b>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <div className="bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6 text-blue-500"
                >
                  <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z"></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-light">Ticketing Password</span>
                <b className="text-sm font-semibold">obmih4g</b>
              </div>
            </div>
          </div>
          <div className="py-4 flex justify-between px-4">
            <Link
              href={`/explore/${event.slug}`}
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
                  `${window.location.origin}/explore/${event.slug}`
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
};

export default EventCard;
