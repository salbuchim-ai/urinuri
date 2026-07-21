import Link from "next/link";
import { redirect } from "next/navigation";
import { FolktaleIllustration } from "@/components/story/FolktaleIllustration";
import { getWorldStory, worldStories } from "@/data/world-stories";

export function generateStaticParams() {
  return worldStories.map((story) => ({
    country: story.countryId,
    slug: story.slug,
  }));
}

export default async function WorldStoryDetailPage({
  params,
}: {
  params: Promise<{ country: string; slug: string }>;
}) {
  const { country, slug } = await params;
  const story = getWorldStory(country, slug);

  if (!story) {
    redirect("/stories/world");
  }

  return (
    <main className="min-h-screen bg-[#dff4ff] px-5 py-7 text-sky-950 md:px-10 md:py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/stories/world"
          className="inline-flex items-center gap-2 rounded-xl px-2 py-1 font-black text-sky-900 transition hover:bg-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-200"
        >
          <span aria-hidden="true">&larr;</span> Stories Around the World
        </Link>

        <article className="mt-8 overflow-hidden rounded-3xl border-[3px] border-sky-950 bg-white/90 pixel-shadow">
          <FolktaleIllustration story={story} />
          <div className="p-6 md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-sky-700">{story.countryLabel}</p>
            <span className="mt-3 inline-flex rounded-full bg-sky-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-sky-800">
              {story.category}
            </span>
            <h1 className="mt-4 text-3xl font-black leading-tight text-sky-950 md:text-4xl">{story.title}</h1>
            <p className="mt-5 text-base font-medium leading-8 text-sky-900/80">{story.description}</p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <section className="rounded-2xl border border-sky-200 bg-sky-50/80 p-5">
                <h2 className="text-sm font-black uppercase tracking-[0.12em] text-sky-800">A child-friendly retelling</h2>
                <p className="mt-2 text-sm font-medium leading-6 text-sky-900/75">{story.retelling}</p>
              </section>
              <section className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5">
                <h2 className="text-sm font-black uppercase tracking-[0.12em] text-amber-800">A note about the tradition</h2>
                <p className="mt-2 text-sm font-medium leading-6 text-amber-950/75">{story.culturalContext}</p>
              </section>
            </div>

            <Link
              href="/create/country"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border-[3px] border-sky-950 bg-yellow-400 px-6 font-black text-sky-950 pixel-shadow transition hover:-translate-y-1 hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-200"
            >
              Create an Inspired Adventure <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
