////this hook is used in categories component and explore page to change category of the page
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useCategoryNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToCategory = useCallback(
    (category: string, basePath = "/explore") => {
      const params = new URLSearchParams(searchParams);
      if (category === "all" || category === "All Events") {
        params.delete("category");
      } else {
        params.set("category", category);
      }
      params.set("page", "1"); // reset to first page on category change
      router.push(`${basePath}?${params.toString()}`);
    },
    [router, searchParams]
  );
  return { goToCategory };
};
