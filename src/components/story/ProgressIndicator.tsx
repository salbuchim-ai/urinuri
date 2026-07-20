type ProgressIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div
      className="flex gap-1.5"
      aria-label={`Story creation progress: step ${currentStep} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, index) => (
        <span
          key={index}
          className={`h-2.5 flex-1 rounded-sm border border-sky-950/10 ${
            index < currentStep ? "bg-yellow-400" : "bg-white/65"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
