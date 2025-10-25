import { useState } from "react";
import { useDebounce } from "./useDebounce";
import { useSearchEvents } from "./endpoints/useEvent";

const MIN_SEARCH_LENGTH = 2;

export function useSearchModal() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 500);

  const { data, isLoading, isFetching, isError, error } = useSearchEvents(
    debouncedKeyword,
    {
      enabled: debouncedKeyword.trim().length >= MIN_SEARCH_LENGTH,
    }
  );

  const isSearching = isLoading || isFetching;
  const shouldShowResults = debouncedKeyword.trim().length >= MIN_SEARCH_LENGTH;
  const hasResults = data?.data && data.data.length > 0;

  const getSearchState = (): "loading" | "error" | "no-results" | "min-chars" | "results" => {
    if (!shouldShowResults && keyword.trim().length > 0) {
      return "min-chars";
    }
    if (isSearching && shouldShowResults) {
      return "loading";
    }
    if (isError && shouldShowResults) {
      return "error";
    }
    if (!hasResults && shouldShowResults && !isSearching) {
      return "no-results";
    }
    return "results";
  };

  const clearSearch = () => {
    setKeyword("");
  };

  return {
    keyword,
    setKeyword,
    debouncedKeyword,
    data,
    isSearching,
    shouldShowResults,
    hasResults,
    error: error as Error,
    searchState: getSearchState(),
    clearSearch,
  };
}