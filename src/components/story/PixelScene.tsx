import Image from "next/image";

type PixelSceneProps = {
  variant: "village" | "legend";
  className?: string;
};

export function PixelScene({ variant, className = "" }: PixelSceneProps) {
  const src = variant === "legend" ? "/generated/countries/japan.png" : "/generated/home/village-hero.png";

  return (
    <div
      className={`relative min-h-72 overflow-hidden rounded-lg border border-slate-200 bg-sky-100 ${className}`}
      aria-label="Pixel-art story landscape"
      role="img"
    >
      <Image
        src={src}
        alt=""
        fill
        unoptimized
        sizes="390px"
        className="pixel-art object-cover"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
