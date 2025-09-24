"use client";
import { reviews } from "@/config/home";
import { useState } from "react";

const Reviews = () => {
  const [activeTab, setActiveTab] = useState(0);

  const nextButton = () => {
    const nextIndex = (activeTab + 1) % reviews.length;
    setActiveTab(nextIndex);
  };

  const prevButton = () => {
    const prevIndex = (activeTab - 1 + reviews.length) % reviews.length;
    setActiveTab(prevIndex);
  };
  return (
    <section className="mx-auto max-w-7xl py-16 space-y-8 ">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center max-w-md mx-auto ">
        Real people, real rave reviews!
      </h2>

      <div className="relative flex items-center justify-center w-full gap-4 sm:gap-12 md:gap-24 mt-10">
        <button
          onClick={prevButton}
          className="text-blue text-lg sm:text-2xl rounded-full border border-blue py-2 px-3"
        >
          &larr;
        </button>

        {/* slider */}
        <div className="flex flex-grow overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeTab * 100}%)` }}
          >
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="flex-shrink-0 w-full px-4 text-center"
              >
                <div className="mb-6 leading-relaxed text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                  {rev.content}
                </div>
                <div className="font-semibold text-sm sm:text-base md:text-lg">
                  {rev.title}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={nextButton}
          className="text-blue text-lg sm:text-2xl rounded-full border border-blue py-2 px-3"
        >
          &rarr;
        </button>

        {/* PAGINATION */}
        <div className="flex items-center justify-center absolute gap-2 left-1/2 -bottom-11 -translate-x-2/4">
          {reviews.map((rev, index) => (
            <div
              key={rev.id}
              onClick={() => setActiveTab(index)}
              className={`size-3 rounded-full cursor-pointer ${
                activeTab === index ? "bg-blue" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
