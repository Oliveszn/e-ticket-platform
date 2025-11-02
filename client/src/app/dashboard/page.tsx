"use client";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PaymentHistoryCard from "@/components/dashboard/PaymentHistoryCard";
import { usePromoterEvents } from "@/hooks/endpoints/useEvent";
import { useProfile } from "@/hooks/endpoints/useUser";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  const { data, isLoading, isError, error } = useProfile();
  const {
    data: events,
    isLoading: eventsLoading,
    isError: eventsIsError,
    error: eventsError,
  } = usePromoterEvents();
  const noOfevents = events?.data.length;
  const ticketsSold =
    events?.data?.reduce((acc, event) => {
      const eventTicketsSold = event.tickets?.reduce(
        (sum, ticket) => sum + (ticket.sold || 0),
        0
      );
      return acc + eventTicketsSold;
    }, 0) ?? 0;
  0;

  if (isLoading && eventsLoading) {
    return <LoadingSpinner />;
  }
  return (
    <main className="mx-auto px-4 py-6 container">
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 mt-2">Welcome to your dashboard.</p>
      </div>

      {/* PROFILE CARD  */}
      <div className="space-y-8">
        <div className="p-5 border border-gray-200 rounded-lg shadow-sm bg-white flex justify-between">
          <div className="flex gap-2">
            <div className="flex flex-col">
              <span className="font-bold capitalize">
                {data?.firstName} {data?.lastName}
              </span>
              <span className="text-sm">My Organisation</span>
            </div>
          </div>
          <Link href="/dashboard/profile">
            <button
              type="button"
              className="bg-blue-500 shadow-lg rounded whitespace-nowrap gap-2 justify-center flex text-white flex items-center py-2.5 px-4 text-sm undefined"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>My Profile</span>
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <div className="bg-indigo-500 flex-shrink-0 rounded space-y-4 p-4 text-white shadow-sm border border-gray-200">
            <div className="flex justify-between items-center gap-2">
              <div className="flex flex-col gap-2">
                <span className="uppercase text-xs">Balance</span>
                <span className="text-2xl font-bold">N0</span>
              </div>
              <div className="bg-opacity-50 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-8 w-8"
                >
                  <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z"></path>
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-red-500 flex-shrink-0 rounded space-y-4 p-4 text-white shadow-sm border border-gray-200">
            <div className="flex justify-between items-center gap-2">
              <div className="flex flex-col gap-2">
                <span className="uppercase text-xs">My Events</span>
                <span className="text-2xl font-bold">{noOfevents}</span>
              </div>
              <div className="bg-opacity-50 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M21 10V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h7"></path>
                  <path d="M16 2v4"></path>
                  <path d="M8 2v4"></path>
                  <path d="M3 10h18"></path>
                  <path d="M21.29 14.7a2.43 2.43 0 0 0-2.65-.52c-.3.12-.57.3-.8.53l-.34.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L17.5 22l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-blue-500 flex-shrink-0 rounded space-y-4 p-4 text-white shadow-sm border border-gray-200">
            <div className="flex justify-between items-center gap-2">
              <div className="flex flex-col gap-2">
                <span className="uppercase text-xs">Event Views</span>
                <span className="text-2xl font-bold">0</span>
              </div>
              <div className="bg-opacity-50 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-8 w-8"
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-green-500 flex-shrink-0 rounded space-y-4 p-4 text-white shadow-sm border border-gray-200">
            <div className="flex justify-between items-center gap-2">
              <div className="flex flex-col gap-2">
                <span className="uppercase text-xs">Total Tickets Sold</span>
                <span className="text-2xl font-bold">{ticketsSold}</span>
              </div>
              <div className="bg-opacity-50 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-8 w-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <PaymentHistoryCard />
      </div>
    </main>
  );
};

export default DashboardPage;
