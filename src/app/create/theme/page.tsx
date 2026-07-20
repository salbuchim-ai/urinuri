import { SelectionStep } from "@/components/story/SelectionStep";
import { themes } from "@/data/themes";

export default function ThemePage() {
  return (
    <SelectionStep
      currentStep={5}
      stepName="Theme"
      title="Choose a Theme"
      selectionKey="theme"
      options={themes}
      backHref="/create/mood"
      nextHref="/create/length"
      cardType="theme"
    />
  );
}
