"use client";
import { getAllEvents, getEventsByCategory } from "@/store/event-slice";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { categories } from "@/config/explore";
import { useCategoryNavigation } from "@/hooks/useCategoryNavigation";

const Explore = () => {
  const searchParams = useSearchParams();
  const { goToCategory } = useCategoryNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const category = searchParams.get("category") || "";

  //fetching all events and category events
  const { data, isLoading, error, isError, isFetching } = useQuery({
    queryKey: ["events", category, page],
    queryFn: () => {
      if (category && category !== "all") {
        return getEventsByCategory({
          category,
          page,
          limit,
        });
      }
      return getAllEvents({ page, limit });
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
  const pagination = data?.pagination;

  useEffect(() => {
    if (!category) {
      setSelectedCategory("All Events");
    } else {
      setSelectedCategory(category);
    }
  }, [category]);

  const handleCategoryChange = (newCategory: string) => {
    goToCategory(newCategory);
  };

  ///function that handles page change(pagination) and sets the path to url
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  ////this handles change of category and updates usestate
  const handleSelectCategory = (name: string) => {
    setSelectedCategory(name);
  };

  //func to change the categ
  const handleApply = () => {
    //find the query for the selected category and update it
    const selectedCat = categories.find((cat) => cat.name === selectedCategory);
    if (selectedCat) {
      handleCategoryChange(selectedCat.name);
    } else {
      handleCategoryChange("all");
    }
    setIsDrawerOpen(false);
  };

  ////reseting state
  const handleClear = () => {
    setSelectedCategory("All Events");
    handleCategoryChange("all");
    setIsDrawerOpen(false);
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
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {(error as Error).message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Events</h1>
      {/* OVERLAY  */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className={`fixed inset-0 bg-black/50 transition-opacity z-[9999999] ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>
      <div className="flex gap-4 items-center my-14">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-[#000] bg-[url('/arrow-down.svg')] text-white overflow-hidden text-left whitespace-nowrap text-sm md:text-base font-normal border border-solid border-[#000] leading-6 py-2 pr-10 pl-4 rounded-xl text-ellipsis max-w-xs !bg-no-repeat !bg-size-[16px] !bg-[position:calc(100%_-_10px)_50%] cursor-pointer"
          type="button"
        >
          {selectedCategory}
        </button>

        <div
          id="drawer-bottom-category"
          className={`fixed bottom-0 left-0 right-0 z-[9999999] w-full p-0 overflow-y-auto transition-transform bg-transparent transition-transform duration-300 ease-out flex ${
            isDrawerOpen ? "translate-y-0" : "translate-y-full"
          } `}
          aria-labelledby="drawer-bottom-label"
          aria-hidden="true"
        >
          <div className="flex flex-col bg-white w-[490px] max-h-[70vh] mx-auto rounded-t-[16px] overflow-hidden">
            <div className="flex justify-between px-[24px] min-h-[60px] bg-[#FBFBFB] items-center">
              <div className="w-[20px] h-[20px]"></div>
              <div className="text-black font-bold sm:font-black text-[16px]">
                Category
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-black cursor-pointer"
                type="button"
              >
                <svg
                  className="w-[14px] h-[14px]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  ></path>
                </svg>
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <div className="flex-grow px-[24px] pt-[6px] overflow-y-auto max-h-[470px]">
              {categories.map((cat) => (
                <div
                  key={cat.query}
                  onClick={() => handleSelectCategory(cat.name)}
                  className={`w-full py-[16px] [&:not(:last-child)]:border-b-[1px] flex justify-between items-center cursor-pointer ${
                    selectedCategory === cat.name ? "font-semibold" : ""
                  }`}
                >
                  {cat.name}
                  {selectedCategory === cat.name && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M13.3327 4L5.99935 11.3333L2.66602 8"
                        stroke="#61646C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full flex justify-between items-center min-h-[72px] px-[32px] py-[20px] border-t-[1px]">
              <button
                onClick={() => handleClear()}
                className="text-[16px] font-bold sm:font-black text-[#4D4D4D]"
                type="button"
              >
                Clear
              </button>
              <button
                onClick={() => handleApply()}
                className="px-[24px] py-[10px] bg-blue rounded-[8px] min-w-[80px] text-white text-[16px] cursor-pointer"
                type="button"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {data && data.data.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No events available at the moment
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data &&
              data.data.map((event: any) => (
                <Link
                  key={event._id}
                  href={`/explore/${event._id}`}
                  className="block group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Event Image */}
                    <div className="relative h-48 bg-gray-200">
                      {event.image?.url ? (
                        <img
                          src={event.image.url}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
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

                      {/* Category Badge */}
                      <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {event.category}
                      </span>
                    </div>

                    {/* Event Details */}
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {event.title}
                      </h3>

                      <div className="space-y-2 text-sm text-gray-600">
                        {/* Date & Time */}
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>
                            {new Date(event.eventDate).toLocaleDateString()} at{" "}
                            {event.eventTime}
                          </span>
                        </div>

                        {/* Venue */}
                        {event.venue.isPublic && (
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span className="line-clamp-1">
                              {event.venue.name}, {event.venue.city}
                            </span>
                          </div>
                        )}

                        {/* Tickets Info */}
                        {event.tickets && event.tickets.length > 0 && (
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                              />
                            </svg>
                            <span>
                              From ₦
                              {Math.min(
                                ...event.tickets.map((t: any) => t.price)
                              ).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Description Preview */}
                      {event.description && (
                        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {/* PAGINATION  */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {pagination?.page} of {pagination?.totalPages}
            </span>
            <button
              disabled={pagination && page >= pagination.totalPages}
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          {isFetching && (
            <p className="text-sm text-gray-500">Loading next page...</p>
          )}
        </>
      )}
    </div>
  );
};

export default Explore;
