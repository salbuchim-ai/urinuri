import Link from "next/link";
import { PixelScene } from "@/components/story/PixelScene";

const menuCards = [
  {
    href: "/create",
    emoji: "✍️",
    title: "Create a Story",
    description: "Let’s create a new story together.",
    color: "bg-yellow-100",
  },
  {
    href: "/stories/world",
    emoji: "🌏",
    title: "Stories Around the World",
    description: "Discover folktales and legends from around the world.",
    color: "bg-emerald-100",
  },
  {
    href: "/stories/my",
    emoji: "📚",
    title: "My Stories",
    description: "Revisit the stories you’ve created.",
    color: "bg-pink-100",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#dff4ff] text-sky-950">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 md:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="UriNuri home">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-sky-950 bg-yellow-400 text-2xl pixel-shadow">
            🌈
          </span>
          <span>
            <span className="pixel-text block text-xl font-black tracking-tight">UriNuri</span>
            <span className="block text-[10px] font-black uppercase tracking-[0.22em] text-sky-700">
              Our World, Our Story
            </span>
          </span>
        </Link>
        <span className="pixel-text hidden rounded-lg border-2 border-sky-950/15 bg-white/70 px-3 py-2 text-xs font-black sm:inline-block">
          STORY STUDIO
        </span>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-12 pt-8 md:px-10 md:pb-20 md:pt-14 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="pixel-text inline-flex rounded-lg border-2 border-sky-950 bg-white/75 px-3 py-2 text-xs font-black uppercase tracking-[0.15em] text-sky-800">
            A tiny story-making adventure
          </p>
          <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-sky-950 md:text-7xl">
            Every Story
            <span className="mt-2 block text-emerald-600">Begins With You</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-sky-900/75 md:text-xl">
            Choose a world, meet a character, and guide a brand-new story one delightful decision at a time.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -right-3 -top-5 rounded-xl border-[3px] border-sky-950 bg-yellow-300 px-4 py-3 text-2xl pixel-shadow">
            ✨
          </div>
          <PixelScene variant="village" className="min-h-80 rotate-1" />
          <div className="absolute -bottom-5 left-4 rounded-xl border-[3px] border-sky-950 bg-white px-4 py-3 font-black pixel-shadow">
            Your next chapter is waiting!
          </div>
        </div>
      </section>

      <section className="border-y-[3px] border-sky-950/10 bg-white/45 px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="pixel-text text-xs font-black uppercase tracking-[0.2em] text-sky-700">Choose your path</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">What would you like to do?</h2>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {menuCards.map((card, index) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-2xl border-[3px] border-sky-950 bg-white p-5 pixel-shadow transition hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-yellow-200"
              >
                <div className={`flex min-h-44 items-center justify-center rounded-xl border-2 border-sky-950/10 text-7xl ${card.color}`}>
                  <span className="transition group-hover:scale-110" aria-hidden="true">{card.emoji}</span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-3">
                  <div>
                    <p className="pixel-text text-xs font-black text-sky-700">MENU {String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 text-2xl font-black text-sky-950">{card.title}</h3>
                    <p className="mt-2 leading-7 text-sky-900/70">{card.description}</p>
                  </div>
                  <span className="mt-1 text-2xl text-sky-700 transition group-hover:translate-x-1" aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm font-medium text-sky-900/65 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <p className="pixel-text font-black text-sky-950">UriNuri</p>
        <p>Pick a path. Make it yours.</p>
      </footer>
    </main>
  );
}
