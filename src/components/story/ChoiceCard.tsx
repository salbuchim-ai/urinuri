"use client";

export function ChoiceCard({
  index,
  text,
  disabled = false,
  selected = false,
  onSelect,
}: {
  index: number;
  text: string;
  disabled?: boolean;
  selected?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={onSelect}
      className={`flex w-full items-start gap-3 rounded-lg border bg-white p-3 text-left transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${
        selected ? "border-amber-500 ring-2 ring-amber-400" : "border-slate-200 hover:border-blue-500"
      } disabled:cursor-not-allowed disabled:opacity-70`}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 border-blue-600 text-xs font-black text-blue-700">
        {index}
      </span>
      <span className="text-xs font-bold leading-5 text-slate-950">{text}</span>
    </button>
  );
}
