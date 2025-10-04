"use client";
import { getAllEvents } from "@/store/event-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useEffect } from "react";

const Explore = () => {
  const dispatch = useAppDispatch();
  const { data, status, error, pagination } = useAppSelector(
    (state) => state.event
  );

  useEffect(() => {
    dispatch(getAllEvents({ page: 1, limit: 10 }));
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Events</h1>

      {data && data.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No events available at the moment
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data &&
              data.map((event: any) => (
                <Link
                  key={event._id}
                  href={`/explore/${event._id}`}
                  className="block group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Event Image */}
                    <div className="relative h-48 bg-gray-200">
                      {event.image?.url ? (
                        <img
                          src={event.image.url}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <svg
                            className="w-16 h-16 text-gray-400"
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

                      {/* Category Badge */}
                      <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {event.category}
                      </span>
                    </div>

                    {/* Event Details */}
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {event.title}
                      </h3>

                      <div className="space-y-2 text-sm text-gray-600">
                        {/* Date & Time */}
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>
                            {new Date(event.eventDate).toLocaleDateString()} at{" "}
                            {event.eventTime}
                          </span>
                        </div>

                        {/* Venue */}
                        {event.venue.isPublic && (
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span className="line-clamp-1">
                              {event.venue.name}, {event.venue.city}
                            </span>
                          </div>
                        )}

                        {/* Tickets Info */}
                        {event.tickets && event.tickets.length > 0 && (
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                              />
                            </svg>
                            <span>
                              From ₦
                              {Math.min(
                                ...event.tickets.map((t: any) => t.price)
                              ).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Description Preview */}
                      {event.description && (
                        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {/* Pagination */}
          {pagination?.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() =>
                  dispatch(
                    getAllEvents({
                      page: pagination.page - 1,
                      limit: pagination.limit,
                    })
                  )
                }
                disabled={pagination.page === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() =>
                  dispatch(
                    getAllEvents({
                      page: pagination.page + 1,
                      limit: pagination.limit,
                    })
                  )
                }
                disabled={pagination.page === pagination.totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Explore;
