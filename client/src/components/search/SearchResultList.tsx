import SearchResultItem from "./SearchResultItem";

interface SearchResultsListProps {
  results: any[];
  onSelectResult: () => void;
}

export default function SearchResultsList({
  results,
  onSelectResult,
}: SearchResultsListProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {results.map((event) => (
        <SearchResultItem
          key={event._id}
          event={event}
          onSelect={onSelectResult}
        />
      ))}
    </div>
  );
}
