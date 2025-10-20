interface ErrorMessageProps {
  message: string;
  onBack?: () => void;
}

export default function ErrorMessage({ message, onBack }: ErrorMessageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {message}
      </div>
      {onBack && (
        <button onClick={onBack} className="mt-4 text-blue-600 hover:underline">
          ← Back to events
        </button>
      )}
    </div>
  );
}
