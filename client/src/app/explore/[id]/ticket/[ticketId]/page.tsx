"use client";
import PurchaseForm from "@/components/explore/PurchaseForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getSingleTickets } from "@/store/tickets-slice";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const TicketPurchaePage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { currentTicket, status, error } = useAppSelector(
    (state) => state.ticket
  );

  const eventId = params.id as string;
  const ticketId = params.ticketId as string;

  useEffect(() => {
    if (eventId && ticketId) {
      dispatch(getSingleTickets({ id: eventId, ticketId }));
    }
  }, [dispatch, eventId, ticketId]);

  if (status === "loading") {
    return <div>Loading ticket details...</div>;
  }

  if (!currentTicket) {
    return <div>Ticket not found</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Ticket Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">{currentTicket.name}</h1>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600">Price:</span>
              <span className="ml-2 text-xl font-bold">
                ${currentTicket.price}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Available:</span>
              <span className="ml-2">{currentTicket.available} tickets</span>
            </div>
            {currentTicket.benefits && (
              <div>
                <span className="text-gray-600">Benefits:</span>
                <p className="mt-1">{currentTicket.benefits}</p>
              </div>
            )}
            {currentTicket.description && (
              <div>
                <span className="text-gray-600">Description:</span>
                <p className="mt-1">{currentTicket.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Purchase Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Purchase Ticket</h2>
          <PurchaseForm
            ticketId={ticketId}
            eventId={eventId}
            price={currentTicket.price}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketPurchaePage;
