import { SelectionStep } from "@/components/story/SelectionStep";
import { countries } from "@/data/countries";

export default function CountryPage() {
  return (
    <SelectionStep
      currentStep={1}
      stepName="Country"
      title="Choose a Country"
      selectionKey="country"
      options={countries}
      backHref="/"
      nextHref="/create/character"
      cardType="country"
    />
  );
}
