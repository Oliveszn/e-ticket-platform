"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useEventsCategory,
  useGetEvents,
  useTrendingEvents,
} from "@/hooks/endpoints/useEvent";
import ContentWrapper from "@/components/common/ContentWrapper";
import EventCard from "@/components/explore/EventCard";
import Pagination from "@/components/explore/Pagination";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";
import CategoryDrawer from "@/components/explore/CategoryDrawer";
import Link from "next/link";
import TrendingEventsCard from "@/components/explore/TrendingEventsCard";

const Explore = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const category = searchParams.get("category") || "";

  const {
    isDrawerOpen,
    setIsDrawerOpen,
    selectedCategory,
    handleSelectCategory,
    handleApply,
    handleClear,
  } = useCategoryFilter(category);

  const query =
    category && category !== "all"
      ? useEventsCategory(category, page, limit)
      : useGetEvents(page, limit);
  const { data, isLoading, error, isError, isFetching } = query;
  const pagination = data?.pagination;

  const { data: trendingEvents } = useTrendingEvents();

  ///function that handles page change(pagination) and sets the path to url
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <ContentWrapper>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {(error as Error).message}
        </div>
      </ContentWrapper>
    );
  }

  return (
    <main>
      <ContentWrapper>
        <div className="w-full overflow-x-auto mb-8">
          <h1 className="text-3xl font-bold mb-8">Trending Events</h1>
          <div className="w-full flex items-center justify-start gap-5 mb-14 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:overflow-x-visible">
            {trendingEvents &&
              trendingEvents.data.map((event: any) => (
                <TrendingEventsCard key={event._id} event={event} />
              ))}
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-8">Explore Events</h1>
        <div className="flex gap-4 items-center my-14">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-[#000] bg-[url('/arrow-down.svg')] text-white overflow-hidden text-left whitespace-nowrap text-sm md:text-base font-normal border border-solid border-[#000] leading-6 py-2 pr-10 pl-4 rounded-xl text-ellipsis max-w-xs !bg-no-repeat !bg-size-[16px] !bg-[position:calc(100%_-_10px)_50%] cursor-pointer"
            type="button"
          >
            {selectedCategory}
          </button>
        </div>
        <CategoryDrawer
          isOpen={isDrawerOpen}
          selectedCategory={selectedCategory}
          onClose={() => setIsDrawerOpen(false)}
          onSelectCategory={handleSelectCategory}
          onApply={handleApply}
          onClear={handleClear}
        />

        {data && data.data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No events available at the moment
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mb-14">
              {data &&
                data.data.map((event: any) => (
                  <EventCard key={event._id} event={event} />
                ))}
            </div>
            {pagination && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                isLoading={isFetching}
              />
            )}
          </>
        )}
      </ContentWrapper>
    </main>
  );
};

export default Explore;
