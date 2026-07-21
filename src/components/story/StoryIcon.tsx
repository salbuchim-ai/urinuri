import Image from "next/image";

export function StoryIcon({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <span className={`pixel-icon-float relative block overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes="64px"
        className="pixel-art object-contain"
        style={{ imageRendering: "pixelated" }}
      />
    </span>
  );
}
