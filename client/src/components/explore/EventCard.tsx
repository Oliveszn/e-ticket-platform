import Link from "next/link";
import { formatEventDateTime } from "@/utils/dateHelpers";

export default function EventCard({ event }: any) {
  const { formattedDateTime } = formatEventDateTime(
    event.eventDate,
    event.eventTime
  );
  const minPrice = event.tickets?.length
    ? Math.min(...event.tickets.map((t: any) => t.price))
    : 0;

  return (
    <Link
      href={`/explore/${event.slug}`}
      className="w-full min-h-[198px] p-4 rounded-lg border border-[#f0f1f1] flex justify-between gap-10 shadow-[0_1px_3px_rgba(16,24,40,0.1)] hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col justify-between gap-5 flex-1">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-black leading-7 tracking-wide overflow-hidden line-clamp-1">
            {event.title}
          </h3>

          {/* Date & Time */}
          <div className="flex items-center text-[#61646c] gap-2">
            <span className="text-sm">{formattedDateTime}</span>
          </div>

          {/* Location */}
          {event.venue.isPublic && (
            <div className="flex items-center text-[#61646c] gap-2">
              <span className="text-sm line-clamp-1">
                {event.venue.name}, {event.venue.city}
              </span>
            </div>
          )}
        </div>

        {/* Price */}
        {event.tickets && event.tickets.length > 0 && (
          <div className="text-base font-bold leading-6 text-blue">
            From ₦{minPrice.toLocaleString()}
          </div>
        )}
      </div>

      {/* Event Image */}
      <div className="relative">
        {event.image?.url ? (
          <img
            src={event.image.url}
            alt={event.title}
            className="h-full w-40 max-h-40 rounded overflow-hidden object-cover flex-shrink-0 max-w-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded">
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
      </div>
    </Link>
  );
}
