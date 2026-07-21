import Image from "next/image";
import Link from "next/link";
import { worldStories } from "@/data/world-stories";

export default function WorldStoriesPage() {
  return (
    <main className="min-h-screen bg-[#dff4ff] px-5 py-7 text-sky-950 md:px-10 md:py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl px-2 py-1 font-black text-sky-900 transition hover:bg-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-200"
        >
          <span aria-hidden="true">&larr;</span> UriNuri
        </Link>

        <section className="mt-8 rounded-3xl border-[3px] border-sky-950 bg-white/85 p-6 pixel-shadow md:p-10">
          <p className="pixel-text text-xs font-black uppercase tracking-[0.2em] text-sky-700">
            UriNuri story library
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-sky-950 md:text-5xl">
            Stories Around the World
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-900/75">
            Discover authentic folktales and legends from cultures around the world. Read timeless stories, then create your own inspired adventure.
          </p>

          <div className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {worldStories.map((story) => (
              <Link
                key={`${story.countryId}-${story.slug}`}
                href={`/stories/${story.countryId}/${story.slug}`}
                aria-label={`Read ${story.title} from ${story.countryLabel}`}
                className="group flex h-full min-h-[390px] flex-col overflow-hidden rounded-2xl border-2 border-sky-200 bg-white text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 active:translate-y-0"
              >
                <div className="relative h-44 shrink-0 overflow-hidden bg-sky-100">
                  <Image
                    src={story.imageSrc}
                    alt={story.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="pixel-art pixel-scene-drift object-cover transition duration-200 group-hover:scale-[1.03]"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-sky-700">{story.countryLabel}</p>
                  <span className="mt-2 inline-flex w-fit rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-sky-800">
                    {story.category}
                  </span>
                  <h2 className="mt-3 text-lg font-black leading-6 text-sky-950">{story.title}</h2>
                  <p className="mt-2 flex-1 text-sm font-medium leading-6 text-sky-900/75">{story.description}</p>
                  <span className="mt-4 text-xs font-black text-blue-700 group-hover:text-blue-900">
                    Read this story <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/create/country"
            className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border-[3px] border-sky-950 bg-yellow-400 px-7 font-black text-sky-950 pixel-shadow transition hover:-translate-y-1 hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-200"
          >
            Create a Story <span aria-hidden="true">&rarr;</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
