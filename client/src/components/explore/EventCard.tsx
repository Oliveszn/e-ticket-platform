import Link from "next/link";
import { formatEventDateTime } from "@/utils/dateHelpers";

export default function EventCard({ event }: any) {
  const { formattedDateTime } = formatEventDateTime(
    event.eventDate,
    event.eventTime
  );
  const minPrice = event.tickets?.length
    ? Math.min(...event.tickets.map((t: any) => t.price))
    : 0;

  return (
    <Link
      href={`/explore/${event.slug}`}
      className="w-full min-h-[198px] p-4 rounded-lg border border-[#f0f1f1] flex justify-between gap-10 shadow-[0_1px_3px_rgba(16,24,40,0.1)] hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col justify-between gap-5 flex-1">
        <div className="flex flex-col gap-3">
          <h3 className="text-base sm:text-xl font-black leading-7 tracking-wide overflow-hidden line-clamp-1 capitalize">
            {event.title}
          </h3>

          {/* Date & Time */}
          <div className="flex items-center text-[#61646c] gap-2">
            <span>
              <svg
                className="size-[16px] md:size-[24px] border-solid border border-[#e5e7eb]"
                fill="currentColor"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.333 3.833a.504.504 0 0 1-.5-.5v-2c0-.273.227-.5.5-.5.274 0 .5.227.5.5v2c0 .273-.226.5-.5.5zM10.667 3.833a.504.504 0 0 1-.5-.5v-2c0-.273.226-.5.5-.5.273 0 .5.227.5.5v2c0 .273-.227.5-.5.5zM5.667 9.667a.664.664 0 0 1-.254-.054.688.688 0 0 1-.22-.14A.688.688 0 0 1 5 9c0-.087.02-.173.053-.253a.77.77 0 0 1 .14-.22.688.688 0 0 1 .22-.14.68.68 0 0 1 .727.14c.12.126.193.3.193.473 0 .04-.006.087-.013.133a.424.424 0 0 1-.04.12.504.504 0 0 1-.06.12c-.02.034-.053.067-.08.1a.701.701 0 0 1-.473.194zM8 9.667a.664.664 0 0 1-.253-.054.688.688 0 0 1-.22-.14A.688.688 0 0 1 7.333 9c0-.087.02-.173.054-.253a.77.77 0 0 1 .14-.22.688.688 0 0 1 .22-.14.668.668 0 0 1 .726.14c.12.126.194.3.194.473 0 .04-.007.087-.014.133a.423.423 0 0 1-.04.12.505.505 0 0 1-.06.12c-.02.034-.053.067-.08.1A.701.701 0 0 1 8 9.667zM10.333 9.667a.664.664 0 0 1-.253-.054.688.688 0 0 1-.22-.14l-.08-.1a.505.505 0 0 1-.06-.12.424.424 0 0 1-.04-.12A1.002 1.002 0 0 1 9.667 9c0-.173.073-.347.193-.473a.688.688 0 0 1 .22-.14.666.666 0 0 1 .727.14c.12.126.193.3.193.473 0 .04-.007.087-.013.133a.425.425 0 0 1-.04.12.502.502 0 0 1-.06.12c-.02.034-.054.067-.08.1a.701.701 0 0 1-.474.194zM5.667 12a.664.664 0 0 1-.254-.053.771.771 0 0 1-.22-.14.701.701 0 0 1-.193-.474c0-.087.02-.173.053-.253a.622.622 0 0 1 .14-.22.698.698 0 0 1 .947 0c.12.127.193.3.193.473a.701.701 0 0 1-.193.473.701.701 0 0 1-.473.194zM8 12a.701.701 0 0 1-.473-.194.701.701 0 0 1-.194-.473c0-.087.02-.173.054-.253a.622.622 0 0 1 .14-.22.698.698 0 0 1 .946 0c.06.06.107.133.14.22.034.08.054.166.054.253a.701.701 0 0 1-.194.473A.701.701 0 0 1 8 12zM10.333 12a.701.701 0 0 1-.473-.193.622.622 0 0 1-.14-.22.664.664 0 0 1-.053-.254c0-.086.02-.173.053-.253a.623.623 0 0 1 .14-.22.666.666 0 0 1 .727-.14c.04.013.08.033.12.06.033.02.066.053.1.08.12.127.193.3.193.473a.701.701 0 0 1-.193.474.701.701 0 0 1-.474.193zM13.667 6.56H2.333a.504.504 0 0 1-.5-.5c0-.274.227-.5.5-.5h11.334c.273 0 .5.226.5.5 0 .273-.227.5-.5.5z"></path>
                <path d="M10.667 15.166H5.333c-2.433 0-3.833-1.4-3.833-3.833V5.666c0-2.433 1.4-3.833 3.833-3.833h5.334c2.433 0 3.833 1.4 3.833 3.833v5.667c0 2.433-1.4 3.833-3.833 3.833zM5.333 2.833c-1.906 0-2.833.927-2.833 2.833v5.667c0 1.907.927 2.833 2.833 2.833h5.334c1.906 0 2.833-.926 2.833-2.833V5.666c0-1.906-.927-2.833-2.833-2.833H5.333z"></path>
              </svg>
            </span>
            <span className="text-sm font-normal leading-5">
              {formattedDateTime}
            </span>
          </div>

          {/* Location */}
          {event.venue.isPublic ? (
            <div className="flex items-center text-[#61646c] gap-2">
              <span>
                <svg
                  className="size-[16px] size-[24px] border-solid border border-[#e5e7eb]"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 9.446a2.576 2.576 0 1 1 0-5.153 2.576 2.576 0 1 1 0 5.153zm0-4.153a1.58 1.58 0 1 0-.002 3.162A1.58 1.58 0 0 0 8 5.293z"></path>
                  <path d="M8 15.173a3.98 3.98 0 0 1-2.753-1.113c-1.967-1.894-4.14-4.914-3.32-8.507C2.667 2.293 5.513.833 8 .833h.007c2.486 0 5.333 1.46 6.073 4.727.813 3.593-1.36 6.606-3.327 8.5A3.98 3.98 0 0 1 8 15.173zm0-13.34c-1.94 0-4.433 1.033-5.093 3.94-.72 3.14 1.253 5.847 3.04 7.56a2.95 2.95 0 0 0 4.113 0c1.78-1.713 3.753-4.42 3.047-7.56C12.44 2.866 9.94 1.833 8 1.833z"></path>
                </svg>
              </span>
              <span className="text-sm font-normal leading-5">
                {event.venue.name}, {event.venue.city}
              </span>
            </div>
          ) : (
            <p>Undisclosed</p>
          )}
        </div>

        {/* Price */}
        {event.tickets && event.tickets.length > 0 && (
          <div className="text-base font-bold leading-6 text-blue">
            From ₦{minPrice.toLocaleString()}
          </div>
        )}
      </div>

      {/* Event Image */}
      <div className="relative">
        {event.image?.url ? (
          <img
            src={event.image.url}
            alt={event.title}
            className="h-full w-24 max-h-24 sm:w-40 sm:max-h-40 rounded overflow-hidden object-cover flex-shrink-0 max-w-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
    </Link>
  );
}
