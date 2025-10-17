"use client";
import {
  purchaseTicketsApi,
  verifyTicketPurchaseApi,
} from "@/api/endpoints/order";
import { handleApiError } from "@/utils/helperFunction";
import { TicketPurchaseSchema } from "@/utils/validationSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePurchaseTickets = () => {
  return useMutation({
    mutationFn: ({
      id,
      ticketId,
      form,
    }: {
      id: string;
      ticketId: string;
      form: TicketPurchaseSchema;
    }) => purchaseTicketsApi({ id, ticketId, form }),
  });
};

export const useVerifyTicketPurchase = (reference: string) => {
  return useQuery({
    queryKey: ["verifyPurchase", reference],
    queryFn: () => verifyTicketPurchaseApi(reference),
    enabled: !!reference, // only run when reference is available
    staleTime: 0,
    retry: 1,
  });
};
