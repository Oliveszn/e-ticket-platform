interface NavigationButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
}

export default function NavigationButton({
  direction,
  onClick,
}: NavigationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-blue text-lg sm:text-2xl rounded-full border border-blue py-2 px-3 hover:bg-blue hover:text-white transition-colors cursor-pointer`}
      aria-label={direction === "prev" ? "Previous review" : "Next review"}
    >
      {direction === "prev" ? "←" : "→"}
    </button>
  );
}
