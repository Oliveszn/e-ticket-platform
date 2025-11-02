"use client";

import { useEffect, useRef } from "react";

export const useScroller = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const scrollerInnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      scrollerRef.current &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      scrollerRef.current.setAttribute("data-animated", "true");
      const scrollerInner = scrollerInnerRef.current;
      if (scrollerInner) {
        const scrollerContent = Array.from(
          scrollerInner.children
        ) as HTMLElement[];

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true) as HTMLElement;
          duplicatedItem.setAttribute("aria-hidden", "true");
          scrollerInner.appendChild(duplicatedItem);
        });
      }
    }
  }, []);

  return { scrollerRef, scrollerInnerRef };
};
