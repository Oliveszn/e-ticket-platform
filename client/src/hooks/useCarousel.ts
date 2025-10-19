////hook for carousel on review component
import { useState } from "react";

export function useCarousel(totalItems: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  return {
    activeIndex,
    next,
    prev,
    goTo,
  };
}
