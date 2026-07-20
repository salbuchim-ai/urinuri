"use client";

export function PrimaryButton({
  children,
  type = "button",
  disabled = false,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#f3b400] bg-[#ffbf00] px-6 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#ffc933] focus:outline-none focus:ring-4 focus:ring-yellow-200 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-200 disabled:text-slate-400 ${className}`}
    >
      {children}
    </button>
  );
}
