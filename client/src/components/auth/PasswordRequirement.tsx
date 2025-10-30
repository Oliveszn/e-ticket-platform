interface PasswordRequirementProps {
  isMet: boolean;
  label: string;
}

export const PasswordRequirement = ({
  isMet,
  label,
}: PasswordRequirementProps) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
        isMet ? "bg-green-500" : "bg-gray-400"
      }`}
      aria-hidden="true"
    />
    <span
      className={`transition-colors duration-200 ${
        isMet ? "text-green-700" : "text-gray-600"
      }`}
    >
      {label}
    </span>
  </div>
);
