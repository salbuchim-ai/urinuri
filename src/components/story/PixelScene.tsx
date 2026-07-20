type PixelSceneProps = {
  variant: "village" | "legend";
  className?: string;
};

export function PixelScene({ variant, className = "" }: PixelSceneProps) {
  return (
    <div
      className={`pixel-scene-grid relative min-h-72 overflow-hidden rounded-2xl border-[3px] border-sky-950 bg-sky-200 ${className}`}
      aria-label={variant === "legend" ? "Pixel art legendary landscape" : "Pixel art village landscape"}
      role="img"
    >
      <div className="absolute left-8 top-9 h-8 w-24 rounded-full bg-white/75" />
      <div className="absolute right-8 top-16 h-7 w-20 rounded-full bg-white/65" />
      <div className="absolute left-1/2 top-14 -translate-x-1/2 text-6xl" aria-hidden="true">
        {variant === "legend" ? "🌄" : "☀️"}
      </div>
      <div className="absolute inset-x-0 bottom-20 text-center text-7xl" aria-hidden="true">
        {variant === "legend" ? "🏰🌲🐉" : "🌲🏠🌲"}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-emerald-500 to-emerald-300" />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-4xl" aria-hidden="true">
        {variant === "legend" ? "🌉" : "🏡"}
      </div>
    </div>
  );
}
