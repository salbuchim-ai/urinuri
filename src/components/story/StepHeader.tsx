type StepHeaderProps = {
  currentStep: number;
  stepName: string;
};

export function StepHeader({ currentStep, stepName }: StepHeaderProps) {
  return (
    <header className="mb-2 text-center">
      <h1 className="text-xl font-black tracking-tight text-slate-950">
        {currentStep}. {stepName}
      </h1>
    </header>
  );
}
