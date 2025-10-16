import { SingleTicketResponse, TicketResponse } from "@/utils/types";
import apiClient from "../client";

export const getTickets = async ({ id }: { id: string }) => {
  const response = await apiClient.get<TicketResponse>(
    `/api/tickets/events/${id}`
  );
  return response.data;
};

export const getSingleTickets = async ({
  id,
  ticketId,
}: {
  id: string;
  ticketId: string;
}) => {
  const response = await apiClient.get<SingleTicketResponse>(
    `/api/tickets/events/${id}/ticket/${ticketId}`
  );
  return response.data;
};
