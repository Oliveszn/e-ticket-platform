import Image from "next/image";
import Link from "next/link";

export default function EventCreationCTA() {
  return (
    <div className="w-full overflow-hidden py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-start max-w-2xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold md:font-bold lg:font-extrabold mb-6">
            Planning an event? Selling tickets has never been easier
          </h2>
          <p className="text-base md:text-lg font-normal max-w-lg text-gray-600">
            Sell tickets online, promote your event, and manage everything in
            one place.
          </p>

          <div className="mt-8 md:mt-14 w-full flex justify-center md:justify-start">
            <Link
              className="block bg-transparent text-base font-normal leading-5 rounded-lg cursor-pointer text-center py-4 px-8 text-blue border border-blue w-full md:w-auto hover:bg-blue hover:text-white transition-all duration-300"
              href="/dashboard"
            >
              Create an event
            </Link>
          </div>
        </div>

        <div className="mt-8 md:mt-14 flex-shrink-0">
          <Image
            src="/event.jpg"
            alt="Event organizer managing tickets"
            width={350}
            height={250}
            className="rounded-lg object-contain w-auto h-auto"
          />
        </div>
      </div>
    </div>
  );
}
