import Link from "next/link";
import { PixelScene } from "@/components/story/PixelScene";

type FeatureLandingProps = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  variant: "village" | "legend";
};

export function FeatureLanding({
  title,
  description,
  buttonLabel,
  href,
  variant,
}: FeatureLandingProps) {
  return (
    <main className="min-h-screen bg-[#dff4ff] px-5 py-7 text-sky-950 md:px-10 md:py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl px-2 py-1 font-black text-sky-900 transition hover:bg-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-200"
        >
          <span aria-hidden="true">&larr;</span> UriNuri
        </Link>

        <section className="mt-8 grid items-center gap-8 rounded-3xl border-[3px] border-sky-950 bg-white/85 p-6 pixel-shadow md:grid-cols-[1fr_1.1fr] md:p-10">
          <div>
            <p className="pixel-text text-xs font-black uppercase tracking-[0.2em] text-sky-700">
              UriNuri adventure menu
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-sky-950 md:text-5xl">{title}</h1>
            <p className="mt-5 text-lg leading-8 text-sky-900/75">{description}</p>
            <Link
              href={href}
              className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border-[3px] border-sky-950 bg-yellow-400 px-7 font-black text-sky-950 pixel-shadow transition hover:-translate-y-1 hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-200"
            >
              {buttonLabel} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <PixelScene variant={variant} className="min-h-80" />
        </section>
      </div>
    </main>
  );
}
