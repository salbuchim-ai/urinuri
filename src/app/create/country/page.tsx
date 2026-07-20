import { SelectionStep } from "@/components/story/SelectionStep";
import { countries } from "@/data/countries";

export default function CountryPage() {
  return (
    <SelectionStep
      currentStep={1}
      title="Choose a Country"
      description="Choose the cultural setting that will inspire your story."
      selectionKey="country"
      options={countries}
      backHref="/create"
      nextHref="/create/character"
    />
  );
}
