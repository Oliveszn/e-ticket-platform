"use client";
import { categories } from "@/config/explore";

interface CategoryDrawerProps {
  isOpen: boolean;
  selectedCategory: string;
  onClose: () => void;
  onSelectCategory: (name: string) => void;
  onApply: () => void;
  onClear: () => void;
}

export default function CategoryDrawer({
  isOpen,
  selectedCategory,
  onClose,
  onSelectCategory,
  onApply,
  onClear,
}: CategoryDrawerProps) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 transition-opacity z-[9999999] ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      />

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[9999999] w-full p-0 overflow-y-auto transition-transform bg-transparent duration-300 ease-out flex ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="flex flex-col bg-white w-[490px] max-w-full max-h-[70vh] mx-auto rounded-t-[16px] overflow-hidden shadow-xl">
          <div className="flex justify-between px-6 min-h-[60px] bg-[#FBFBFB] items-center">
            <div className="w-5 h-5" />
            <h2 id="drawer-title" className="text-black font-bold text-base">
              Category
            </h2>
            <button
              onClick={onClose}
              className="text-black hover:text-gray-600 transition-colors"
              aria-label="Close category drawer"
            >
              <svg
                className="w-3.5 h-3.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          {/* Categories items */}
          <div className="flex-grow px-6 pt-1.5 overflow-y-auto max-h-[470px]">
            {categories.map((cat) => (
              <button
                key={cat.query}
                onClick={() => onSelectCategory(cat.name)}
                className={`w-full py-4 border-b border-gray-200 last:border-b-0 flex justify-between items-center hover:bg-gray-50 transition-colors ${
                  selectedCategory === cat.name ? "font-semibold" : ""
                }`}
              >
                <span>{cat.name}</span>
                {selectedCategory === cat.name && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M13.3327 4L5.99935 11.3333L2.66602 8"
                      stroke="#61646C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Footer buttons */}
          <div className="w-full flex justify-between items-center min-h-[72px] px-8 py-5 border-t">
            <button
              onClick={onClear}
              className="text-base font-bold text-[#4D4D4D] hover:text-gray-900 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={onApply}
              className="px-6 py-2.5 bg-blue rounded-lg min-w-[80px] text-white text-base hover:bg-blue-600 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
