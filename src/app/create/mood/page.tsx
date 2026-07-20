import { SelectionStep } from "@/components/story/SelectionStep";
import { moods } from "@/data/moods";

export default function MoodPage() {
  return (
    <SelectionStep
      currentStep={4}
      stepName="Story Mood"
      title="Choose a Story Mood"
      selectionKey="mood"
      options={moods}
      backHref="/create/adventure"
      nextHref="/create/theme"
      cardType="mood"
    />
  );
}
