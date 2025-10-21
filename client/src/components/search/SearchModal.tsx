"use client";
import { Input } from "../ui/input";
import { useSearchModal } from "@/hooks/useSearchModal";
import Modal from "../common/ModalWrapper";
import SearchStates from "./SearchState";
import SearchResultsList from "./SearchResultList";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}
export default function SearchModal({ open, onClose }: SearchModalProps) {
  const {
    keyword,
    setKeyword,
    debouncedKeyword,
    data,
    hasResults,
    error,
    searchState,
    clearSearch,
  } = useSearchModal();

  const handleClose = () => {
    clearSearch();
    onClose();
  };

  const handleSelectResult = () => {
    clearSearch();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} className="flex flex-col h-auto">
      <Input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="What event are you looking for?"
        className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
        autoFocus
      />

      {/* Results Section */}
      <div className="mt-4 max-h-80 overflow-y-auto">
        {searchState !== "results" ? (
          <SearchStates
            state={searchState}
            keyword={debouncedKeyword}
            error={error}
          />
        ) : hasResults ? (
          <SearchResultsList
            results={data.data}
            onSelectResult={handleSelectResult}
          />
        ) : null}
      </div>
    </Modal>
  );
}
