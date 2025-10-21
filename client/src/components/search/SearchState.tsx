interface SearchStatesProps {
  state: "loading" | "error" | "no-results" | "min-chars" | "results";
  keyword?: string;
  error?: Error;
}

export default function SearchStates({
  state,
  keyword,
  error,
}: SearchStatesProps) {
  switch (state) {
    case "loading":
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-3" />
          <p className="text-gray-500 text-sm">Searching...</p>
        </div>
      );

    case "error":
      return (
        <div className="text-center py-8">
          <svg
            className="w-12 h-12 text-red-400 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-500 text-sm">
            {error?.message || "Something went wrong"}
          </p>
        </div>
      );

    case "no-results":
      return (
        <div className="text-center py-8">
          <svg
            className="w-12 h-12 text-gray-300 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-gray-500">
            No events found for{" "}
            <span className="font-semibold">"{keyword}"</span>
          </p>
        </div>
      );

    case "min-chars":
      return (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">
            Type at least 2 characters to search
          </p>
        </div>
      );

    default:
      return null;
  }
}
