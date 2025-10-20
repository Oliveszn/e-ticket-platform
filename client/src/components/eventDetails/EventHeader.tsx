interface EventHeaderProps {
  title: string;
  month: string;
  day: number;
  venue: {
    name: string;
    address: string;
    isPublic: boolean;
  };
  formattedDate: string;
  formattedTime: string;
}

export default function EventHeader({
  title,
  month,
  day,
  venue,
  formattedDate,
  formattedTime,
}: EventHeaderProps) {
  return (
    <div className="flex gap-4 sm:gap-6 mb-4">
      {/* Date Badge */}
      <div className="text-center flex-shrink-0">
        <div className="bg-blue-600 rounded-t sm:text-xl py-2 px-4 text-white">
          {month}
        </div>
        <div className="text-xl sm:text-3xl rounded-b py-3 bg-white">{day}</div>
      </div>

      {/* Event Info */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold capitalize">{title}</h1>

        <div className="flex text-xs gap-2 sm:text-sm items-center sm:gap-4 flex-wrap">
          {/* Location */}
          {venue.isPublic && (
            <div className="hidden sm:flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 sm:h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span>
                {venue.name}, {venue.address}
              </span>
            </div>
          )}

          {/* Date */}
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 sm:h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            <span>{formattedDate}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 sm:h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{formattedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
