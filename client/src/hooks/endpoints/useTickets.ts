"use client";
import { getSingleTickets, getTickets } from "@/api/endpoints/tickets";
import { useQuery } from "@tanstack/react-query";

export const useTickets = (id: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["tickets", id],
    queryFn: () => getTickets({ id }),
    enabled: options?.enabled ?? !!id,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });
};

export const useSingleTicket = (
  id: string,
  ticketId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["ticket"],
    queryFn: () => getSingleTickets({ id, ticketId }),
    enabled: options?.enabled ?? !!id,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });
};
