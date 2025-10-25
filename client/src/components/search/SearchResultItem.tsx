import Link from "next/link";
import Image from "next/image";

interface SearchResultItemProps {
  event: {
    _id: string;
    slug: string;
    title: string;
    description?: string;
    category: string;
    image?: {
      url: string;
    };
  };
  onSelect: () => void;
}

export default function SearchResultItem({
  event,
  onSelect,
}: SearchResultItemProps) {
  return (
    <Link
      href={`/explore/${event.slug}`}
      className="flex gap-4 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all hover:shadow-md group"
      onClick={onSelect}
    >
      {/* Event Image */}
      <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
        {event.image?.url ? (
          <Image
            src={event.image.url}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-300"
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

      {/* Event Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base text-gray-900 truncate group-hover:text-blue-600 transition-colors capitalize">
          {event.title}
        </h3>

        {event.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {event.description}
          </p>
        )}

        <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full capitalize">
          {event.category}
        </span>
      </div>

      {/* Arrow Icon */}
      <div className="flex items-center">
        <svg
          className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}
