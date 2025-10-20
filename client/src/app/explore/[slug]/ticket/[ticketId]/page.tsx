"use client";
import { useParams, useRouter } from "next/navigation";
import { useSingleTicket } from "@/hooks/endpoints/useTickets";
import { useGetAnEvent } from "@/hooks/endpoints/useEvent";
import EventBreadCrumb from "@/components/explore/EventBreadCrumb";
import ContentWrapper from "@/components/common/ContentWrapper";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import TicketSummary from "@/components/ticketPurchase/TicketSummary";
import { useTicketPurchase } from "@/hooks/useTicketPurchase";
import PersonalInfoSection from "@/components/ticketPurchase/PersonalInfoSection";
import MultipleRecipientsSection from "@/components/ticketPurchase/MultipleRecipinets";

const TicketPurchaePage = () => {
  const params = useParams();
  const router = useRouter();

  ///we fetch the slug from params so as to access the id
  const slug = params.slug as string;
  const ticketId = params.ticketId as string;

  const { data: eventData, isLoading: isEventLoading } = useGetAnEvent(slug);
  const eventId = eventData?.data?._id as string;

  const {
    data: currentTicket,
    isLoading: isTicketLoading,
    isError,
  } = useSingleTicket(eventId, ticketId, {
    enabled: !!eventId,
  });

  // const formik = useFormik<TicketPurchaseSchema>({
  //   initialValues: {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     numberOfTickets: 1,
  //     info: "",
  //     sendToMultipleRecipients: false,
  //     recipients: undefined,
  //   },
  //   validationSchema: toFormikValidationSchema(ticketPurchaseSchema),
  //   onSubmit: (values) => {
  //     handleSubmit(values);
  //   },
  // });
  // const {
  //   mutate: purchaseTickets,
  //   isPending,
  //   isSuccess,
  // } = usePurchaseTickets();

  // const handleSubmit = async (data: any) => {
  //   purchaseTickets(
  //     { id: eventId, ticketId, form: data },
  //     {
  //       onSuccess: (data) => {
  //         toast.success(data.message);
  //         // Redirect to payment URL
  //         if (data?.data.paymentUrl)
  //           window.location.href = data?.data.paymentUrl;
  //       },

  //       onError: (error: any) => {
  //         const message = handleApiError(error);
  //         toast.error(message);
  //       },
  //     }
  //   );
  // };

  // const fees = 250 * formik.values.numberOfTickets + 100;
  // const subTotal =
  //   (currentTicket?.data.price ?? 0) * formik.values.numberOfTickets;

  const { formik, isPending, calculateFees, calculateSubTotal } =
    useTicketPurchase(eventId || "", ticketId);

  // Calculate costs
  const fees = calculateFees(formik.values.numberOfTickets);
  const subTotal = calculateSubTotal(
    currentTicket?.data.price ?? 0,
    formik.values.numberOfTickets
  );

  if (isEventLoading || isTicketLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !currentTicket) {
    return (
      <ErrorMessage
        message="Error Loading tickets"
        onBack={() => router.push("/explore")}
      />
    );
  }
  return (
    <main>
      <EventBreadCrumb
        eventTitle={eventData?.data?.title}
        ticketName={currentTicket?.data?.name}
      />
      <ContentWrapper>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 space-y-4">
              <PersonalInfoSection formik={formik} />
              <MultipleRecipientsSection formik={formik} />
            </div>

            <TicketSummary
              name={currentTicket?.data.name}
              personsPerTicket={currentTicket?.data?.personsPerTicket}
              numberOfTickets={formik.values.numberOfTickets}
              showVolume={currentTicket?.data.showVolume}
              available={currentTicket?.data.available}
              fees={fees}
              subTotal={subTotal}
              isPending={isPending}
            />
          </div>
        </form>
      </ContentWrapper>
    </main>
  );
};

export default TicketPurchaePage;
