"use client";
import { useProfile } from "@/hooks/endpoints/useUser";
import { useAppSelector } from "@/store/hooks";

const Profile = () => {
  const { data, isLoading, isError, error } = useProfile();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error: {(error as Error).message}
      </div>
    </div>;
  }

  return (
    <main>
      <div className="space-y-8">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
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
            <span className="font-semibold text-xl capitalize">My Profile</span>
          </div>
          <div className="sm:hidden block">
            <button
              type="button"
              className="bg-blue-500 shadow-lg rounded whitespace-nowrap gap-2 justify-center flex text-white flex items-center py-2.5 px-4 text-sm undefined"
            >
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
        <div className="space-y-8">
          <div className="border rounded dark:border-gray-600 dark:bg-secondary-alt bg-white text-black dark:text-gray-50 undefined">
            <div className="rounded-xl p-5 sm:p-8 flex flex-col sm:flex-row gap-4">
              <div className="sm:col-span-9 font-montserrat space-y-5">
                <div className="flex items-center gap-3">
                  <p className="text-2xl md:text-4xl font-semibold capitalize">
                    {data?.firstName} {data?.lastName}
                  </p>
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 border text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-blue-500/90 rounded-md h-8 w-8 p-0"
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="radix-:r4:"
                    data-state="closed"
                  >
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
                      className="h-4 w-4"
                    >
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                    </svg>
                  </button>
                </div>
                <div className="flex justify-start gap-5">
                  <p className="flex items-center text-sm gap-2 bg-blue-100 px-2 py-1 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 text-pry"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                      ></path>
                    </svg>{" "}
                    Email Unverified
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded dark:border-gray-600 dark:bg-secondary-alt bg-white text-black dark:text-gray-50 undefined">
            <ul className="w-full font-montserrat">
              <li className="px-6 py-4 border-b flex items-center gap-4 border-gray-200 w-full rounded-t-lg bg-pry-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>{" "}
                Personal Information
              </li>
              <li className="px-6 py-4 flex justify-between items-center border-b border-gray-200 w-full">
                <span>Name:</span>
                <span>
                  {data?.firstName} {data?.lastName}{" "}
                </span>
              </li>
              <li className="px-6 py-4 flex justify-between items-center border-b border-gray-200 w-full">
                <span>Email:</span>
                <span>{data?.email}</span>
              </li>
              <li className="px-6 py-4 flex justify-between items-center border-b border-gray-200 w-full">
                <span>Mobile:</span>
                <span>{data?.number}</span>
              </li>
              <li className="px-6 py-4 flex justify-between items-center border-b border-gray-200 w-full">
                <span>ID:</span>
                <span>{data?._id}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
