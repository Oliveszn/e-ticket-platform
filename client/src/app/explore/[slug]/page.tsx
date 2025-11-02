"use client";
import ContentWrapper from "@/components/common/ContentWrapper";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import EventHeader from "@/components/eventDetails/EventHeader";
import EventImage from "@/components/eventDetails/EventImage";
import EventSidebar from "@/components/eventDetails/EventSidebar";
import EventBreadCrumb from "@/components/explore/EventBreadCrumb";
import { useGetAnEvent } from "@/hooks/endpoints/useEvent";
import { useTickets } from "@/hooks/endpoints/useTickets";
import { useEventFormatting } from "@/hooks/useEventFormatting";
import { useParams, useRouter } from "next/navigation";

const EventDetails = () => {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;
  const {
    data: currentEvent,
    isLoading: isEventLoading,
    isError: isEventError,
  } = useGetAnEvent(slug);

  const eventId = currentEvent?.data._id as string;
  const {
    data: ticket,
    isLoading: isTicketsLoading,
    isError: isTicketsError,
  } = useTickets(eventId || "", {
    enabled: !!eventId,
  });

  const event = currentEvent?.data;
  const { month, day, formattedDate, formattedTime } = useEventFormatting(
    event?.eventDate,
    event?.eventTime
  );

  if (isEventLoading || isTicketsLoading) {
    return <LoadingSpinner />;
  }

  if (isEventError || isTicketsError) {
    return (
      <ErrorMessage
        message="Error loading event and tickets"
        onBack={() => router.push("/explore")}
      />
    );
  }

  if (!event) {
    return (
      <ErrorMessage
        message="Event not found"
        onBack={() => router.push("/explore")}
      />
    );
  }
  return (
    <main className="">
      <EventBreadCrumb eventTitle={currentEvent?.data.title} />
      <ContentWrapper>
        {/* HEADER  */}

        <EventHeader
          title={event.title}
          month={month}
          day={day}
          venue={event.venue}
          formattedDate={formattedDate}
          formattedTime={formattedTime}
        />

        {/* LEFT CONTENT  */}
        <div className="grid sm:grid-cols-12 gap-4">
          <div className="sm:col-span-8 space-y-4">
            <EventImage imageUrl={event.image?.url} title={event.title} />
            <div className="border rounded bg-white text-black undefined">
              <div className="">
                <p className="sm:text-lg font-semibold p-5 border-b font-harabara">
                  About Event
                </p>
                <p className="p-5 text-xs sm:text-sm">{event.description}</p>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT  */}
          <EventSidebar
            eventDate={event.eventDate}
            formattedDate={formattedDate}
            formattedTime={formattedTime}
            venue={event.venue}
            tickets={ticket?.data || []}
            eventSlug={slug}
          />
        </div>
      </ContentWrapper>
    </main>
  );
};

export default EventDetails;
