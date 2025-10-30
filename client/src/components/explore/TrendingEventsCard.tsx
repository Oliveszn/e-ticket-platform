import { formatEventDateTime } from "@/utils/dateHelpers";
import Link from "next/link";

export default function TrendingEventsCard({ event }: any) {
  const { formattedDateTime } = formatEventDateTime(
    event.eventDate,
    event.eventTime
  );
  return (
    <Link
      key={event._id}
      href={`/explore/${event.slug}`}
      className="h-[454px] min-w-[240px] sm:min-w-[280px] lg:w-1/4 lg:min-w-0 rounded-2xl relative overflow-hidden snap-start"
    >
      <img
        src={event.image.url}
        alt=""
        className="w-full min-h-[70%] absolute object-cover top-0 left-0 object-center"
      />
      <div
        className="w-full h-full py-8 px-4 relative flex flex-col items-center justify-end text-center gap-1 z-10 text-white "
        style={{
          background:
            "linear-gradient(360deg, #000 30%, rgba(0, 0, 0, 0.15) 70%)",
        }}
      >
        <h5 className="uppercase font-medium text-xs leading-4">
          Highlighted Event
        </h5>
        <h4 className="text-2xl leading-8 font-bold capitalize">
          {event.title}
        </h4>
        <h6 className="font-medium leading-6 text-base">{formattedDateTime}</h6>
      </div>
    </Link>
  );
}
