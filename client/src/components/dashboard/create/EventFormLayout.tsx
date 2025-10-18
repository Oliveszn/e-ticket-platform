"use client";

interface Step {
  id: number;
  name: string;
  component: React.ReactNode;
}

interface EventFormLayoutProps {
  title: string;
  steps: Step[];
  currentStep: number;
  formik: any;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isPending: boolean;
  isEditMode: boolean;
}

const EventFormLayout: React.FC<EventFormLayoutProps> = ({
  title,
  steps,
  currentStep,
  formik,
  onNext,
  onPrev,
  onSubmit,
  isPending,
  isEditMode,
}) => {
  return (
    <div className="px-3 py-8 space-y-8">
      <h1 className="text-base md:text-lg font-semibold">{title}</h1>

      <div className="border rounded bg-white text-black sm:w-4/5 mx-auto">
        <form onSubmit={formik.handleSubmit}>
          {/* Stepper Header */}
          <div className="p-5">
            <div className="flex justify-between items-center mb-6">
              {steps.map((s, i) => (
                <div key={s.id} className="flex flex-col gap-2 items-center">
                  <div
                    className={`h-10 w-10 rounded-full border border-primary flex items-center justify-center ${
                      i === currentStep
                        ? "bg-blue text-white" // current step
                        : i < currentStep
                        ? "bg-blue border-blue-500 text-black" // completed steps
                        : "bg-white border-gray-300 text-gray-400" // upcoming steps
                    }`}
                  >
                    <span>{i + 1}</span>
                  </div>
                  <span
                    className={`font-medium text-sm ${
                      i <= currentStep ? "text-blue" : "text-gray-600"
                    }`}
                  >
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <hr />

          {/* Form Content */}
          <div className="py-5 sm:w-4/5 mx-auto divide-y">
            {steps[currentStep].component}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={onPrev}
                  className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={onNext}
                  className="px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Next
                </button>
              ) : (
                <button
                  disabled={isPending}
                  type="button"
                  onClick={onSubmit}
                  className="px-6 py-2 rounded bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending
                    ? isEditMode
                      ? "Saving..."
                      : "Creating..."
                    : isEditMode
                    ? "Save Changes"
                    : "Create Event"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventFormLayout;
