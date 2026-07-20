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
  emoji: string;
  options: StoryOption[];
}> = [
  { key: "country", label: "Country", emoji: "🌏", options: countries },
  { key: "character", label: "Character", emoji: "🧸", options: characters },
  { key: "adventure", label: "Adventure", emoji: "🗺️", options: adventures },
  { key: "theme", label: "Theme", emoji: "💡", options: themes },
  { key: "mood", label: "Story Mood", emoji: "🎨", options: moods },
  { key: "length", label: "Story Length", emoji: "📚", options: lengths },
];

function getOptionTitle(options: StoryOption[], value: string | null) {
  return options.find((option) => option.id === value)?.title ?? "Not selected yet";
}

export function StorySummary({ selections }: { selections: StorySelections }) {
  return (
    <section className="mt-8 rounded-2xl border-[3px] border-sky-950/15 bg-white/80 p-5 pixel-shadow md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="pixel-text text-xs font-black uppercase tracking-[0.18em] text-sky-700">
            My story
          </p>
          <h2 className="mt-2 text-2xl font-black text-sky-950">Your story ingredients</h2>
        </div>
        <span className="text-3xl" aria-hidden="true">🧺</span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {summaryRows.map((row) => (
          <div key={row.key} className="rounded-xl border-2 border-sky-950/10 bg-[#effaff] px-4 py-3">
            <span className="text-lg" aria-hidden="true">{row.emoji}</span>
            <p className="mt-2 text-xs font-black uppercase tracking-wide text-sky-700/70">{row.label}</p>
            <p className="mt-1 font-black text-sky-950">
              {getOptionTitle(row.options, selections[row.key])}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
