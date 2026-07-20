import { SelectionStep } from "@/components/story/SelectionStep";
import { adventures } from "@/data/adventures";

export default function AdventurePage() {
  return (
    <SelectionStep
      currentStep={3}
      title="Choose an Adventure"
      description="Pick a place where your character will discover something wonderful."
      selectionKey="adventure"
      options={adventures}
      backHref="/create/character"
      nextHref="/create/theme"
      cardVariant="adventure"
    />
  );
}
