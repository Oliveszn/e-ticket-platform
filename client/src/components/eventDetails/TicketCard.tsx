import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ticket } from "@/utils/types";

interface TicketCardProps {
  ticket: Ticket;
  eventSlug: string;
}

export default function TicketCard({ ticket, eventSlug }: TicketCardProps) {
  return (
    <div className="flex justify-between items-center py-4 gap-8">
      <div className="flex-1">
        <p className="capitalize font-medium">{ticket.name}</p>
        <p className="text-lg font-bold text-blue-600 mt-1">
          ₦{ticket.price.toLocaleString()}
        </p>
        {ticket.description && (
          <p className="text-gray-500 dark:text-gray-300 text-xs mt-1">
            {ticket.description}
          </p>
        )}
      </div>

      <div className="flex-shrink-0">
        {ticket.available === 0 ? (
          <Button
            className="cursor-not-allowed bg-gray-200"
            size="sm"
            variant="secondary"
            disabled
          >
            Sold Out
          </Button>
        ) : (
          <Link
            href={`/explore/${eventSlug}/ticket/${ticket.id}`}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 bg-blue-500 text-white hover:bg-blue-600 h-10 px-4 py-2"
          >
            Select
          </Link>
        )}
      </div>
    </div>
  );
}
