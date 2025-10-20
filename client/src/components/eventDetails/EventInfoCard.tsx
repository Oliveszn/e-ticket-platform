import { ReactNode } from "react";

interface EventInfoCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export default function EventInfoCard({
  icon,
  label,
  value,
}: EventInfoCardProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="bg-blue-50 dark:bg-blue-500 rounded-full p-3 flex-shrink-0">
        {icon}
      </div>
      <div className="space-y-2">
        <span className="text-gray-500 dark:text-gray-200 text-xs sm:text-sm">
          {label}
        </span>
        <p className="font-semibold sm:text-base">{value}</p>
      </div>
    </div>
  );
}
