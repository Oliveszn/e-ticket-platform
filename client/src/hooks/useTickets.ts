import { getSingleTickets, getTickets } from "@/api/endpoints/tickets";
import { useQuery } from "@tanstack/react-query";

export const useTickets = (id: string) => {
  return useQuery({
    queryKey: ["tickets", id],
    queryFn: () => getTickets({ id }),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });
};

export const useSingleTicket = (id: string, ticketId: string) => {
  return useQuery({
    queryKey: ["ticket"],
    queryFn: () => getSingleTickets({ id, ticketId }),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });
};
