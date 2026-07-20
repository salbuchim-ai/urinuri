import Link from "next/link";
import { PixelScene } from "@/components/story/PixelScene";
import { StoryIcon } from "@/components/story/StoryIcon";

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-3 py-4 text-slate-950 sm:px-5">
      <div className="mx-auto w-full max-w-[390px]">
        <h1 className="mb-2 text-center text-xl font-black">Home</h1>
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-[#f8fafc] p-2.5 shadow-sm">
          <PixelScene variant="village" className="min-h-[184px]" />

          <Link
            href="/create/country"
            className="mt-2 flex min-h-[122px] items-center gap-4 rounded-lg border border-amber-400 bg-[#ffdc76] px-5 transition hover:bg-[#ffd45a] focus:outline-none focus:ring-4 focus:ring-yellow-200"
          >
            <StoryIcon src="/generated/home/create-story-icon.png" alt="" className="h-16 w-16 shrink-0" />
            <span>
              <span className="block text-xl font-black">Create a Story</span>
              <span className="mt-2 block text-sm font-bold leading-5">Let&apos;s create<br />a new story together.</span>
            </span>
          </Link>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <Link
              href="/stories/world"
              className="flex min-h-[132px] items-center gap-3 rounded-lg border border-emerald-400 bg-[#b9e3ad] p-3 text-left transition hover:bg-[#a8d99a] focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <StoryIcon src="/generated/home/world-stories-icon.png" alt="" className="h-16 w-16 shrink-0" />
              <span className="text-xs font-black leading-5">Stories around<br />the world</span>
            </Link>
            <Link
              href="/stories/my"
              className="flex min-h-[132px] items-center gap-3 rounded-lg border border-blue-400 bg-[#afd5fb] p-3 text-left transition hover:bg-[#9ac9f5] focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <StoryIcon src="/generated/home/my-stories-icon.png" alt="" className="h-16 w-16 shrink-0" />
              <span>
                <span className="block text-xs font-black leading-5">My Stories</span>
                <span className="mt-1 block text-[11px] font-bold leading-4">Revisit the stories<br />you&apos;ve created.</span>
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
