"use client";
import { useState, useEffect } from "react";
import { categories } from "@/config/explore";
import { useCategoryNavigation } from "./useCategoryNavigation";

export function useCategoryFilter(initialCategory: string) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const { goToCategory } = useCategoryNavigation();

  useEffect(() => {
    setSelectedCategory(initialCategory || "All Events");
  }, [initialCategory]);

  ////this handles change of category and updates usestate
  const handleSelectCategory = (name: string) => {
    setSelectedCategory(name);
  };

  //func to change the category
  const handleApply = () => {
    const selectedCat = categories.find((cat) => cat.name === selectedCategory);
    if (selectedCat) {
      goToCategory(selectedCat.name);
    } else {
      goToCategory("all");
    }
    setIsDrawerOpen(false);
  };

  ////reseting state
  const handleClear = () => {
    setSelectedCategory("All Events");
    goToCategory("all");
    setIsDrawerOpen(false);
  };

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    selectedCategory,
    handleSelectCategory,
    handleApply,
    handleClear,
  };
}
