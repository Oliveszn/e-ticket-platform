import { TicketPurchaseSchema } from "@/utils/validationSchema";
import apiClient from "../client";

export const purchaseTicketsApi = async ({
  id,
  ticketId,
  form,
}: {
  id: string;
  ticketId: string;
  form: TicketPurchaseSchema;
}) => {
  const response = await apiClient.post(
    `/api/tickets/events/${id}/tickets/${ticketId}/purchase`,
    form
  );
  return response.data;
};

// 🟢 Verify Ticket Purchase
export const verifyTicketPurchaseApi = async (reference: string) => {
  const response = await apiClient.get(`/api/tickets/events/verify-purchase`, {
    params: { reference },
    withCredentials: true,
  });
  return response.data;
};
