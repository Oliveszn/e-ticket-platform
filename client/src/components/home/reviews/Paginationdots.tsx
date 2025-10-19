interface PaginationDotsProps {
  total: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

export default function PaginationDots({
  total,
  activeIndex,
  onDotClick,
}: PaginationDotsProps) {
  return (
    <div className="flex items-center justify-center absolute gap-2 left-1/2 -bottom-11 -translate-x-2/4">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`size-3 rounded-full cursor-pointer transition-colors ${
            activeIndex === index ? "bg-blue" : "bg-gray-300 hover:bg-gray-400"
          }`}
          aria-label={`Go to review ${index + 1}`}
          aria-current={activeIndex === index ? "true" : "false"}
        />
      ))}
    </div>
  );
}
