"use client";
import { categories } from "@/config/explore";
import { useCategoryNavigation } from "@/hooks/useCategoryNavigation";
import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  const { goToCategory } = useCategoryNavigation();
  return (
    <section className="mx-auto max-w-7xl py-16">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-10 md:items-end text-[#161b26] text-center md:text-left py-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold md:font-bold lg:font-extrabold leading-tight max-w-lg mx-auto md:mx-0">
          There is something here for everyone
        </h2>
        <p className="leading-relaxed max-w-md mx-auto md:mx-0">
          From dance parties to power talks, there's something for everyone. We
          make it easy for you to find events that match your vibe.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-8 place-items-center py-8">
        {categories
          .filter((cat) => cat.name !== "All Events")
          .map((cat) => (
            <div
              key={cat.query}
              onClick={() => goToCategory(cat.name, "/explore")}
              className="flex flex-col items-center group"
            >
              <div className="rounded-lg transition-colors group-hover:bg-blue-100/30 p-3">
                <Image
                  src={cat.img}
                  alt={`${cat.name} image`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="size-24 sm:size-32 md:size-40 object-contain"
                />
              </div>
              <div className="mt-2">{cat.name}</div>
            </div>
          ))}
      </div>

      <div className="w-full overflow-hidden py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-start">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold md:font-bold lg:font-extrabold max-w-lg mb-6">
              Planning an event? Selling tickets has never been easier
            </h2>
            <p className="text-base md:text-lg font-normal max-w-lg">
              Sell tickets online, promote your event, and manage everything in
              one place.
            </p>

            <div className="mt-14 w-full flex justify-center md:justify-start">
              <Link
                className="block bg-transparent text-base font-normal leading-5 rounded-lg cursor-pointer text-center py-4 px-8 text-blue border border-blue w-full md:w-auto hover:bg-blue hover:text-white transition-all duration-300"
                href="/dashboard"
              >
                Create an event
              </Link>
            </div>
          </div>

          <div className="mt-14">
            <Image src="/event.jpg" alt="image" width={400} height={250} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
