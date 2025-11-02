import Countdown from "@/components/explore/CountDown";
import EventInfoCard from "./EventInfoCard";
import TicketCard from "./TicketCard";
import { Ticket } from "@/utils/types";

interface EventSidebarProps {
  eventDate: string;
  formattedDate: string;
  formattedTime: string;
  venue: {
    name: string;
    address: string;
    city: string;
    state: string;
  };
  tickets: Ticket[];
  eventSlug: string;
}

export default function EventSidebar({
  eventDate,
  formattedDate,
  formattedTime,
  venue,
  tickets,
  eventSlug,
}: EventSidebarProps) {
  return (
    <div className="sm:col-span-4 hidden sm:block space-y-5">
      {/* Event Details Card */}
      <div className="bg-white border rounded">
        <h2 className="p-5 border-b font-bold sm:text-lg">Event Details</h2>
        <div className="p-5 space-y-8">
          <Countdown eventDate={eventDate} />

          {/* Date & Time */}
          <EventInfoCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 text-blue-500"
              >
                <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                <path
                  fillRule="evenodd"
                  d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            }
            label="Date and Time"
            value={`${formattedDate}, ${formattedTime}`}
          />

          {/* Location */}
          <EventInfoCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 text-blue-500"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            }
            label="Location"
            value={`${venue.name}, ${venue.address}, ${venue.city}, ${venue.state}`}
          />
        </div>
      </div>

      {/* Tickets Card */}
      <div className="bg-white sticky top-28 border rounded">
        <h2 className="p-5 border-b font-bold sm:text-lg">Tickets</h2>
        <div className="px-5 divide-y">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} eventSlug={eventSlug} />
          ))}
        </div>
      </div>
    </div>
  );
}
