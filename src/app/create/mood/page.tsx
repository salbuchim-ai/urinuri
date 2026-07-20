import { SelectionStep } from "@/components/story/SelectionStep";
import { moods } from "@/data/moods";

export default function MoodPage() {
  return (
    <SelectionStep
      currentStep={5}
      title="Choose a Story Mood"
      description="Set the feeling of the story before the first scene begins."
      selectionKey="mood"
      options={moods}
      backHref="/create/theme"
      nextHref="/create/length"
    />
  );
}
