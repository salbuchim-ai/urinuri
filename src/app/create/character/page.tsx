import { SelectionStep } from "@/components/story/SelectionStep";
import { characters } from "@/data/characters";

export default function CharacterPage() {
  return (
    <SelectionStep
      currentStep={2}
      title="Choose a Character"
      description="Who will lead the adventure? Pick one character to guide the story."
      selectionKey="character"
      options={characters}
      backHref="/create/country"
      nextHref="/create/adventure"
      cardVariant="character"
    />
  );
}
