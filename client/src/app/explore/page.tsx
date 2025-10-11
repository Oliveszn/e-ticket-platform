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
    <main className="px-6 sm:px-8 lg:px-10 py-16">
      <div className="max-w-6xl mx-auto">
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
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data &&
                data.data.map((event: any) => (
                  <Link
                    key={event._id}
                    href={`/explore/${event._id}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
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

                        <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          {event.category}
                        </span>
                      </div>

                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {event.title}
                        </h3>

                        <div className="space-y-2 text-sm text-gray-600">
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
                              {new Date(event.eventDate).toLocaleDateString()}{" "}
                              at {event.eventTime}
                            </span>
                          </div>

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

                        {event.description && (
                          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mb-14">
              {data &&
                data.data.map((event: any) => (
                  <Link
                    key={event._id}
                    className="w-full min-h-[198px] p-4 rounded-lg border border-[#f0f1f1] flex justify-between gap-10 shadow-[0_1px_3px_rgba(16,24,40,0.1)]"
                    href={`/explore/${event._id}`}
                  >
                    <div className="flex flex-col justify-between gap-5">
                      <div className="flex flex-col gap-3">
                        <p className="text-xl font-black leading-7 tracking-wide overflow-hidden line-clamp-1">
                          {event.title}
                        </p>
                        <div className="flex items-center text-[#61646c] gap-2">
                          <span>
                            <svg
                              className="size-[24px]"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M5.333 3.833a.504.504 0 0 1-.5-.5v-2c0-.273.227-.5.5-.5.274 0 .5.227.5.5v2c0 .273-.226.5-.5.5zM10.667 3.833a.504.504 0 0 1-.5-.5v-2c0-.273.226-.5.5-.5.273 0 .5.227.5.5v2c0 .273-.227.5-.5.5zM5.667 9.667a.664.664 0 0 1-.254-.054.688.688 0 0 1-.22-.14A.688.688 0 0 1 5 9c0-.087.02-.173.053-.253a.77.77 0 0 1 .14-.22.688.688 0 0 1 .22-.14.68.68 0 0 1 .727.14c.12.126.193.3.193.473 0 .04-.006.087-.013.133a.424.424 0 0 1-.04.12.504.504 0 0 1-.06.12c-.02.034-.053.067-.08.1a.701.701 0 0 1-.473.194zM8 9.667a.664.664 0 0 1-.253-.054.688.688 0 0 1-.22-.14A.688.688 0 0 1 7.333 9c0-.087.02-.173.054-.253a.77.77 0 0 1 .14-.22.688.688 0 0 1 .22-.14.668.668 0 0 1 .726.14c.12.126.194.3.194.473 0 .04-.007.087-.014.133a.423.423 0 0 1-.04.12.505.505 0 0 1-.06.12c-.02.034-.053.067-.08.1A.701.701 0 0 1 8 9.667zM10.333 9.667a.664.664 0 0 1-.253-.054.688.688 0 0 1-.22-.14l-.08-.1a.505.505 0 0 1-.06-.12.424.424 0 0 1-.04-.12A1.002 1.002 0 0 1 9.667 9c0-.173.073-.347.193-.473a.688.688 0 0 1 .22-.14.666.666 0 0 1 .727.14c.12.126.193.3.193.473 0 .04-.007.087-.013.133a.425.425 0 0 1-.04.12.502.502 0 0 1-.06.12c-.02.034-.054.067-.08.1a.701.701 0 0 1-.474.194zM5.667 12a.664.664 0 0 1-.254-.053.771.771 0 0 1-.22-.14.701.701 0 0 1-.193-.474c0-.087.02-.173.053-.253a.622.622 0 0 1 .14-.22.698.698 0 0 1 .947 0c.12.127.193.3.193.473a.701.701 0 0 1-.193.473.701.701 0 0 1-.473.194zM8 12a.701.701 0 0 1-.473-.194.701.701 0 0 1-.194-.473c0-.087.02-.173.054-.253a.622.622 0 0 1 .14-.22.698.698 0 0 1 .946 0c.06.06.107.133.14.22.034.08.054.166.054.253a.701.701 0 0 1-.194.473A.701.701 0 0 1 8 12zM10.333 12a.701.701 0 0 1-.473-.193.622.622 0 0 1-.14-.22.664.664 0 0 1-.053-.254c0-.086.02-.173.053-.253a.623.623 0 0 1 .14-.22.666.666 0 0 1 .727-.14c.04.013.08.033.12.06.033.02.066.053.1.08.12.127.193.3.193.473a.701.701 0 0 1-.193.474.701.701 0 0 1-.474.193zM13.667 6.56H2.333a.504.504 0 0 1-.5-.5c0-.274.227-.5.5-.5h11.334c.273 0 .5.226.5.5 0 .273-.227.5-.5.5z"></path>
                              <path d="M10.667 15.166H5.333c-2.433 0-3.833-1.4-3.833-3.833V5.666c0-2.433 1.4-3.833 3.833-3.833h5.334c2.433 0 3.833 1.4 3.833 3.833v5.667c0 2.433-1.4 3.833-3.833 3.833zM5.333 2.833c-1.906 0-2.833.927-2.833 2.833v5.667c0 1.907.927 2.833 2.833 2.833h5.334c1.906 0 2.833-.926 2.833-2.833V5.666c0-1.906-.927-2.833-2.833-2.833H5.333z"></path>
                            </svg>
                          </span>

                          <p>
                            {(() => {
                              const date = new Date(event.eventDate);
                              const day = date.getDate();

                              // Function to get ordinal suffix
                              const getOrdinal = (n: any) => {
                                const s = ["th", "st", "nd", "rd"];
                                const v = n % 100;
                                return s[(v - 20) % 10] || s[v] || s[0];
                              };

                              const formattedDate = date.toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  month: "short",
                                }
                              );

                              const [hours, minutes] = event.eventTime
                                .split(":")
                                .map(Number);
                              date.setHours(hours, minutes);

                              // Format time with AM/PM
                              const formattedTime = date.toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              );

                              return (
                                <>
                                  {`${formattedDate} ${day}${getOrdinal(
                                    day
                                  )} · ${formattedTime}`}
                                </>
                              );
                            })()}
                          </p>
                        </div>
                        <div className="flex items-center text-[#61646c] gap-2">
                          <span>
                            <svg
                              className="size-[24px]"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 9.446a2.576 2.576 0 1 1 0-5.153 2.576 2.576 0 1 1 0 5.153zm0-4.153a1.58 1.58 0 1 0-.002 3.162A1.58 1.58 0 0 0 8 5.293z"></path>
                              <path d="M8 15.173a3.98 3.98 0 0 1-2.753-1.113c-1.967-1.894-4.14-4.914-3.32-8.507C2.667 2.293 5.513.833 8 .833h.007c2.486 0 5.333 1.46 6.073 4.727.813 3.593-1.36 6.606-3.327 8.5A3.98 3.98 0 0 1 8 15.173zm0-13.34c-1.94 0-4.433 1.033-5.093 3.94-.72 3.14 1.253 5.847 3.04 7.56a2.95 2.95 0 0 0 4.113 0c1.78-1.713 3.753-4.42 3.047-7.56C12.44 2.866 9.94 1.833 8 1.833z"></path>
                            </svg>
                          </span>

                          <p>
                            {event.venue.isPublic && (
                              <span className="line-clamp-1">
                                {event.venue.name}, {event.venue.city}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="text-base font-bold leading-6 text-blue">
                        {event.tickets && event.tickets.length > 0 && (
                          <span>
                            From ₦
                            {Math.min(
                              ...event.tickets.map((t: any) => t.price)
                            ).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      {event.image?.url ? (
                        <img
                          src={event.image.url}
                          alt={event.title}
                          className="h-full w-40 max-h-40 rounded overflow-hidden object-cover flex-shrink-0 max-w-full"
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
    </main>
  );
};

export default Explore;
