import { SelectionStep } from "@/components/story/SelectionStep";
import { adventures } from "@/data/adventures";

export default function AdventurePage() {
  return (
    <SelectionStep
      currentStep={3}
      stepName="Adventure"
      title="Choose an Adventure"
      selectionKey="adventure"
      options={adventures}
      backHref="/create/character"
      nextHref="/create/mood"
      cardType="adventure"
    />
  );
}
