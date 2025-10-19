"use client";
import { categories } from "@/config/explore";
import { useCategoryNavigation } from "@/hooks/useCategoryNavigation";
import Image from "next/image";
import EventCreationCTA from "./categories/EventCreation";
import CategoryCard from "./categories/CategoryCard";

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
            <CategoryCard
              key={cat.query}
              name={cat.name}
              image={cat.img}
              onClick={() => goToCategory(cat.name, "/explore")}
            />
          ))}
      </div>
      <EventCreationCTA />
    </section>
  );
};

export default Categories;
