import { adventures } from "@/data/adventures";
import { characters } from "@/data/characters";
import { countries } from "@/data/countries";
import { lengths } from "@/data/lengths";
import { moods } from "@/data/moods";
import { themes } from "@/data/themes";
import type { StoryOption, StorySelectionKey, StorySelections } from "@/types/story";

const summaryRows: Array<{
  key: StorySelectionKey;
  label: string;
  options: StoryOption[];
}> = [
  { key: "country", label: "Country", options: countries },
  { key: "character", label: "Character", options: characters },
  { key: "adventure", label: "Adventure", options: adventures },
  { key: "theme", label: "Theme", options: themes },
  { key: "mood", label: "Story Mood", options: moods },
  { key: "length", label: "Story Length", options: lengths },
];

function getOptionTitle(options: StoryOption[], value: string | null) {
  return options.find((option) => option.id === value)?.title ?? "Not selected yet";
}

export function StorySummary({ selections }: { selections: StorySelections }) {
  return (
    <section className="mt-8 rounded-2xl border-[3px] border-sky-950/15 bg-white/80 p-5 pixel-shadow md:p-7">
      <div>
        <p className="pixel-text text-xs font-black uppercase tracking-[0.18em] text-sky-700">
          My story
        </p>
        <h2 className="mt-2 text-2xl font-black text-sky-950">Your story ingredients</h2>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {summaryRows.map((row) => (
          <div key={row.key} className="rounded-xl border-2 border-sky-950/10 bg-[#effaff] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-sky-700/70">{row.label}</p>
            <p className="mt-1 font-black text-sky-950">
              {getOptionTitle(row.options, selections[row.key])}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
