import { SelectionStep } from "@/components/story/SelectionStep";
import { themes } from "@/data/themes";

export default function ThemePage() {
  return (
    <SelectionStep
      currentStep={4}
      title="Choose a Theme"
      description="What idea should shine through your character’s choices?"
      selectionKey="theme"
      options={themes}
      backHref="/create/adventure"
      nextHref="/create/mood"
    />
  );
}
