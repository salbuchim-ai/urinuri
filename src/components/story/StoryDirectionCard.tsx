"use client";

export function StoryDirectionCard({
  direction,
  index,
  selected,
  onSelect,
}: {
  direction: string;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`flex w-full items-start gap-4 rounded-2xl border-[3px] p-5 text-left pixel-shadow transition hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-yellow-200 ${
        selected
          ? "border-sky-950 bg-yellow-50 shadow-[7px_7px_0_rgba(21,50,75,0.22)]"
          : "border-sky-950/15 bg-white/90 hover:border-sky-950/40"
      }`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-sky-950 bg-sky-200 font-black text-sky-950">
        {index + 1}
      </span>
      <span className="pt-1 font-bold leading-7 text-sky-950">{direction}</span>
      <span className={`ml-auto pt-1 text-xl ${selected ? "text-sky-950" : "text-transparent"}`} aria-hidden="true">
        ✓
      </span>
    </button>
  );
}
