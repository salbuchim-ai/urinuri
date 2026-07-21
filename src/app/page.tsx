import Link from "next/link";
import { PixelScene } from "@/components/story/PixelScene";
import { StoryIcon } from "@/components/story/StoryIcon";

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-3 py-4 text-slate-950 sm:px-5">
      <div className="mx-auto w-full max-w-[390px]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f8fafc] p-2.5 shadow-sm">
          <div className="overflow-hidden rounded-xl border-2 border-sky-200 bg-sky-100">
            <PixelScene variant="village" className="min-h-[184px] !rounded-none !border-0" />

            <div className="pixel-background-drift relative -mt-1 overflow-hidden rounded-xl border-[6px] border-[#8d5a2f] bg-[#c89155] bg-[url('/generated/home/village-hero.png')] bg-cover bg-[center_bottom] p-2 shadow-[inset_0_0_0_2px_rgba(255,235,190,0.65),0_4px_0_rgba(21,50,75,0.18)]">
              <div className="pointer-events-none absolute inset-1.5 rounded-lg border-[3px] border-dashed border-[#f7d79f] opacity-95" aria-hidden="true" />
              <div className="relative z-10 grid gap-2">
                <Link
                  href="/create/country"
                  className="flex min-h-[122px] items-center gap-4 rounded-lg border-2 border-amber-500 bg-[#ffdc76]/95 px-5 transition hover:-translate-y-0.5 hover:bg-[#ffd45a] focus:outline-none focus:ring-4 focus:ring-yellow-200 active:translate-y-0"
                >
                  <StoryIcon src="/generated/home/create-story-icon.png" alt="" className="h-16 w-16 shrink-0" />
                  <span>
                    <span className="block text-xl font-black">Create a Story</span>
                    <span className="mt-2 block text-sm font-bold leading-5">Let&apos;s create<br />a new story together.</span>
                  </span>
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/stories/world"
                    className="flex min-h-[132px] items-center gap-3 rounded-lg border-2 border-emerald-500 bg-[#b9e3ad]/95 p-3 text-left transition hover:-translate-y-0.5 hover:bg-[#a8d99a] focus:outline-none focus:ring-4 focus:ring-blue-100 active:translate-y-0"
                  >
                    <StoryIcon src="/generated/home/world-stories-icon.png" alt="" className="h-16 w-16 shrink-0" />
                    <span className="text-xs font-black leading-5">Stories around<br />the world</span>
                  </Link>
                  <Link
                    href="/stories/my"
                    className="flex min-h-[132px] items-center gap-3 rounded-lg border-2 border-blue-500 bg-[#afd5fb]/95 p-3 text-left transition hover:-translate-y-0.5 hover:bg-[#9ac9f5] focus:outline-none focus:ring-4 focus:ring-blue-100 active:translate-y-0"
                  >
                    <StoryIcon src="/generated/home/my-stories-icon.png" alt="" className="h-16 w-16 shrink-0" />
                    <span>
                      <span className="block text-xs font-black leading-5">My Stories</span>
                      <span className="mt-1 block text-[11px] font-bold leading-4">Revisit the stories<br />you&apos;ve created.</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
