"use client";
import EventCard from "@/components/dashboard/EventCard";
import { usePromoterEvents } from "@/hooks/useEvent";
import { useState, useMemo } from "react";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError, error } = usePromoterEvents();

  const filteredEvents = useMemo(() => {
    if (!data?.data) return [];

    if (!searchTerm.trim()) return data.data; ///returns all data if no search term

    const searchLower = searchTerm.toLowerCase();

    return data.data.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data?.data, searchTerm]);
  const noOfEvents = data?.data.length;
  const filteredCount = filteredEvents.length;
  console.log(22);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error?.message}
        </div>
      </div>
    );
  }
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
            <div className="flex justify-between items-center">
              <p className="font-semibold">
                {/* Events ({noOfevents}) */}
                Events ({filteredCount}{" "}
                {filteredCount !== noOfEvents && `of ${noOfEvents}`})
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>

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
                className="bg-transparent w-full py-2 outline-0"
                placeholder="Search by event name or category..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Show message if no results */}
        {filteredEvents.length === 0 && searchTerm && (
          <div className="text-center py-8 text-gray-500">
            No events found matching "{searchTerm}"
          </div>
        )}

        {filteredEvents?.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </main>
  );
};

export default Events;
