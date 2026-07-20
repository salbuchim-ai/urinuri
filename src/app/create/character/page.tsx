import { SelectionStep } from "@/components/story/SelectionStep";
import { characters } from "@/data/characters";

export default function CharacterPage() {
  return (
    <SelectionStep
      currentStep={2}
      stepName="Character"
      title="Choose a Character"
      selectionKey="character"
      options={characters}
      backHref="/create/country"
      nextHref="/create/adventure"
      cardType="character"
    />
  );
}
