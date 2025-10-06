"use client";
import { Button } from "@/components/ui/button";
import { getAnEvent } from "@/store/event-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getTickets } from "@/store/tickets-slice";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const EventDetails = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentEvent, status, error } = useAppSelector(
    (state) => state.event
  );
  const { data: ticket } = useAppSelector((state) => state.ticket);

  const eventId = params.id as string;
  useEffect(() => {
    if (eventId) {
      dispatch(getAnEvent(eventId));
      dispatch(getTickets(eventId));
    }
  }, [dispatch, eventId]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === "failed" || !currentEvent) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || "Event not found"}
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <div className="relative h-96 bg-gray-900">
        {currentEvent.image?.url ? (
          <img
            src={currentEvent.image.url}
            alt={currentEvent.title}
            className="w-full h-full object-cover opacity-80"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={() => router.push("/explore")}
          className="absolute top-4 left-4 bg-white/90 hover:bg-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Events
        </button>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-24 relative z-10 pb-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Event Header */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-3">
                  {currentEvent.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {currentEvent.title}
                </h1>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                Get Tickets
              </button>
            </div>

            {/* Event Info Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
              {/* Date & Time */}
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600"
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
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                  <p className="font-semibold">
                    {new Date(currentEvent.eventDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <p className="text-gray-700">{currentEvent.eventTime}</p>
                </div>
              </div>

              {/* Location */}
              {currentEvent.venue.isPublic && (
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-green-600"
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
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-semibold">{currentEvent.venue.name}</p>
                    <p className="text-gray-700">
                      {currentEvent.venue.address}, {currentEvent.venue.city},{" "}
                      {currentEvent.venue.state}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {currentEvent.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {currentEvent.description}
                </p>
              </div>
            )}

            {/* Tickets Section */}
            {ticket && ticket.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Available Tickets</h2>
                <div className="space-y-4">
                  {ticket.map((ticket, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-5 hover:border-blue-500 transition"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">
                            {ticket.name}
                          </h3>
                          <p className="text-2xl font-bold text-blue-600">
                            ₦{ticket.price.toLocaleString()}
                          </p>
                          {ticket.benefits && ticket.benefits.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {ticket.benefits}
                            </div>
                          )}
                        </div>
                        <div className="">
                          {ticket.available === 0 ? (
                            <Button
                              // disabled
                              className="cursor-not-allowed bg-gray-200 whitespace-nowrap"
                              size="sm"
                              variant="secondary"
                            >
                              Sold Out
                            </Button>
                          ) : (
                            <Link
                              href={`/explore/${eventId}/ticket/${ticket.id}`}
                              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 bg-blue-500 text-white hover:bg-blue-500/90 h-10 px-4 py-2 cursor-pointer"
                            >
                              Select
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Transaction charges:</strong> Paid by{" "}
                {currentEvent.charge === "Host"
                  ? "Event Organizer"
                  : "Ticket Buyer"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
