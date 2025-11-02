import FaqAccordion from "@/components/common/FaqAccordion";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Works",
  description: "Ticket Purchase",
};

const Works = () => {
  return (
    <main className="py-16 bg-[url('/pricingpattern.png')] bg-no-repeat bg-top bg-contain px-6 sm:px-8 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <section className="max-w-2xl px-4 sm:px-0 mx-auto z-20 relative space-y-4">
          <p className="font-raleway text-3xl sm:text-6xl text-center font-bold">
            No Stress, Just Success—See How It Works
          </p>
          <p className="text-gray-500  text-sm sm:text-base text-center">
            Stagepass makes event planning a breeze! In just a few friendly
            steps, you'll go from idea to live event—no stress, just excitement.
            Here's how it all comes together:
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href={"/auth/login"}
              className="inline-flex bg-black text-white items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 hover:text-slate-900 h-10 px-4 py-2 sm:w-48"
            >
              Create Event
            </Link>
            <Link
              href={"/explore"}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-500/90 h-10 px-4 py-2 sm:w-48"
            >
              Explore
            </Link>
          </div>
        </section>

        <section>
          <div className="py-14 sm:py-20 hidden sm:block">
            <div className="max-w-2xl px-4 sm:px-0 mx-auto z-20 relative space-y-4">
              <p className="font-raleway text-2xl sm:text-3xl text-center font-bold">
                How it works
              </p>
            </div>
          </div>

          <div className="space-y-10 sm:space-y-5 py-10 sm:py-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:py-24 gap-5 items-center">
              <div className="space-y-3 pl-5 md:pl-24">
                <div className="flex flex-col items-start gap-4">
                  <span className="bg-blue-50 p-3 rounded-full">
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
                      className="text-blue-400 w-6 h-6"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  <span className="text-lg sm:text-2xl font-semibold text-gray-900 font-figtree">
                    Step 1: Tell Us About Your Event
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  Let's kick things off! Give your event a catchy name, pick a
                  date, and tell us what makes it special. The more details, the
                  better!
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-3">
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
                      className="text-blue-500 w-4 h-4 mt-1"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Pick a fun event name and a unique link (slug)</span>
                  </li>
                  <li className="flex items-start gap-3">
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
                      className="text-blue-500 w-4 h-4 mt-1"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Choose your event date and time—set the vibe!</span>
                  </li>
                  <li className="flex items-start gap-3">
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
                      className="text-blue-500 w-4 h-4 mt-1"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>
                      Add a venue (or leave it blank if it's a secret!)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
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
                      className="text-blue-500 w-4 h-4 mt-1"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Select a category to help people find you</span>
                  </li>
                  <li className="flex items-start gap-3">
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
                      className="text-blue-500 w-4 h-4 mt-1"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>
                      Share a quick description—what's your event all about?
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
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
                      className="text-blue-500 w-4 h-4 mt-1"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>
                      Who pays the fees?
                      <ul className="list-disc ml-6 text-gray-600 text-sm mt-2">
                        <li>Organizer covers everything (super host!)</li>
                        <li>Attendees pay their way</li>
                        <li>Let's split it 50/50—teamwork!</li>
                      </ul>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
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
                      className="text-blue-500 w-4 h-4 mt-1"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>
                      Upload a stunning event image (first impressions count!)
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/step1.png"
                  alt="Step 1: Tell Us About Your Event Screenshot"
                  width={400}
                  height={400}
                  className="object-cover w-auto h-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 sm:py-24 gap-5 items-center">
              <div className="space-y-3 pl-5 md:pl-24">
                <div className="flex flex-col items-start gap-4">
                  <span className="bg-blue-50 p-3 rounded-full">
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
                      className="text-blue-400 w-6 h-6"
                    >
                      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                      <path d="M13 5v2"></path>
                      <path d="M13 17v2"></path>
                      <path d="M13 11v2"></path>
                    </svg>
                  </span>
                  <span className="text-lg sm:text-2xl font-semibold text-gray-900 font-figtree">
                    Step 2: Create Awesome Tickets
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  Ready to welcome your guests? Set up tickets in seconds—choose
                  prices, set limits, and even add discounts. It is easy,
                  flexible, and totally up to you!
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-3">
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
                      className="text-blue-500 w-4 h-4 mt-1"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Name your ticket and set a price</span>
                  </li>
                  <li className="flex items-start gap-3">
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
                      className="text-blue-500 w-4 h-4 mt-1"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Decide how many tickets are available</span>
                  </li>
                  <li className="flex items-start gap-3">
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
                      className="text-blue-500 w-4 h-4 mt-1"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Choose how many people each ticket admits</span>
                  </li>
                  <li className="flex items-start gap-3">
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
                      className="text-blue-500 w-4 h-4 mt-1"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>
                      Add a special discount (optional, but everyone loves a
                      deal!)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
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
                      className="text-blue-500 w-4 h-4 mt-1"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Double-check your ticket details—almost there!</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/step3.png"
                  alt="Step 3: Create Awesome Tickets Screenshot"
                  width={400}
                  height={400}
                  className="object-cover w-auto h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <FaqAccordion />
      </div>
    </main>
  );
};

export default Works;
