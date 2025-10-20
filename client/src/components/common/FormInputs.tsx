import { ChangeEvent, FocusEvent } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

export default function FormInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
}: FormInputProps) {
  const hasError = error && touched;

  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
          hasError ? "border-red-500" : "border-slate-200"
        }`}
        aria-describedby={hasError ? `${id}-error` : undefined}
        aria-invalid={hasError ? "true" : "false"}
      />
      {hasError && (
        <p id={`${id}-error`} className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
