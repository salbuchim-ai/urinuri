type StepHeaderProps = {
  currentStep: number;
  stepName: string;
};

export function StepHeader({ currentStep, stepName }: StepHeaderProps) {
  return (
    <div className="mb-2" aria-label={`${currentStep}. ${stepName}`} />
  );
}
