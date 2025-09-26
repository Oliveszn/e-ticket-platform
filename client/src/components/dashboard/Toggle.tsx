import { useState } from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onLabel?: string;
  offLabel?: string;
}

export default function Toggle({
  checked,
  onChange,
  onLabel = "On",
  offLabel = "Off",
}: ToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <span className="text-sm font-medium">
        {checked ? onLabel : offLabel}
      </span>
    </div>
  );
}
