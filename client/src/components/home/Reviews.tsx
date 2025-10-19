"use client";
import { reviews } from "@/config/home";
import NavigationButton from "./reviews/NavigationButton";
import ReviewCard from "./reviews/ReviewCard";
import PaginationDots from "./reviews/Paginationdots";
import { useCarousel } from "@/hooks/useCarousel";

const Reviews = () => {
  const { activeIndex, next, prev, goTo } = useCarousel(reviews.length);
  return (
    <section className="mx-auto max-w-7xl py-16 space-y-8 ">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center max-w-md mx-auto ">
        Real people, real rave reviews!
      </h2>
      <div className="relative flex items-center justify-center w-full gap-4 sm:gap-12 md:gap-24 mt-10">
        <NavigationButton direction="prev" onClick={prev} />

        {/* Slider */}
        <div
          className="flex flex-grow overflow-hidden relative"
          role="region"
          aria-label="Customer reviews"
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                content={review.content}
                title={review.title}
              />
            ))}
          </div>
        </div>

        <NavigationButton direction="next" onClick={next} />

        {/* Pagination */}
        <PaginationDots
          total={reviews.length}
          activeIndex={activeIndex}
          onDotClick={goTo}
        />
      </div>
    </section>
  );
};

export default Reviews;
