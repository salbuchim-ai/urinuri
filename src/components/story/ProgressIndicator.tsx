type ProgressIndicatorProps = {
  currentStep: number;
  totalSteps: number;
  className?: string;
};

export function ProgressIndicator({ currentStep, totalSteps, className = "" }: ProgressIndicatorProps) {
  return (
    <div
      className={`flex items-center ${className}`}
      aria-label={`Story creation progress: step ${currentStep} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        const isCurrent = step === currentStep;
        const isComplete = step < currentStep;

        return (
          <span key={step} className="flex flex-1 items-center last:flex-none">
            <span
              className={`h-3.5 w-3.5 rounded-full border-2 border-blue-600 bg-white ${
                isCurrent
                  ? "border-blue-700 bg-[#16802d]"
                  : isComplete
                    ? "bg-blue-700"
                    : ""
              }`}
              aria-hidden="true"
            />
            {step < totalSteps ? (
              <span
                className={`h-0.5 flex-1 ${isComplete ? "bg-blue-700" : "bg-blue-600"}`}
                aria-hidden="true"
              />
            ) : null}
          </span>
        );
      })}
    </div>
  );
}
