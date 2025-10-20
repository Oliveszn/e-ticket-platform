import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "sonner";
import {
  ticketPurchaseSchema,
  TicketPurchaseSchema,
} from "@/utils/validationSchema";
import { usePurchaseTickets } from "./endpoints/useOrder";
import { handleApiError } from "@/utils/helperFunction";

export function useTicketPurchase(eventId: string, ticketId: string) {
  const { mutate: purchaseTickets, isPending } = usePurchaseTickets();

  const formik = useFormik<TicketPurchaseSchema>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      numberOfTickets: 1,
      info: "",
      sendToMultipleRecipients: false,
      recipients: undefined,
    },
    validationSchema: toFormikValidationSchema(ticketPurchaseSchema),
    onSubmit: (values) => {
      purchaseTickets(
        { id: eventId, ticketId, form: values },
        {
          onSuccess: (data) => {
            toast.success(data.message);
            if (data?.data.paymentUrl) {
              window.location.href = data.data.paymentUrl;
            }
          },
          onError: (error: any) => {
            const message = handleApiError(error);
            toast.error(message);
          },
        }
      );
    },
  });

  const calculateFees = (numberOfTickets: number) => {
    return 250 * numberOfTickets + 100;
  };

  const calculateSubTotal = (price: number, numberOfTickets: number) => {
    return price * numberOfTickets;
  };

  return {
    formik,
    isPending,
    calculateFees,
    calculateSubTotal,
  };
}
