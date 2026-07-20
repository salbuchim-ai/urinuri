import Link from "next/link";

const storySteps = [
  {
    number: "01",
    emoji: "🌏",
    title: "여행할 나라",
    description: "새로운 나라와 문화가 기다리고 있어요.",
  },
  {
    number: "02",
    emoji: "🧒",
    title: "나만의 주인공",
    description: "이야기의 주인공을 직접 골라요.",
  },
  {
    number: "03",
    emoji: "🗺️",
    title: "신나는 모험",
    description: "오늘 떠나고 싶은 모험을 선택해요.",
  },
  {
    number: "04",
    emoji: "✨",
    title: "이야기 완성",
    description: "AI가 우리 아이만의 이야기를 만들어요.",
  },
];

const featuredWorlds = [
  {
    flag: "🇰🇷",
    country: "한국",
    title: "달빛 궁궐의 비밀",
    description: "달빛이 비치는 오래된 궁궐에서 시작되는 신비한 모험",
    background: "from-rose-100 to-orange-100",
  },
  {
    flag: "🇯🇵",
    country: "일본",
    title: "벚꽃 바람을 따라서",
    description: "사라진 봄바람을 찾아 떠나는 따뜻하고 용감한 여행",
    background: "from-pink-100 to-purple-100",
  },
  {
    flag: "🇨🇳",
    country: "중국",
    title: "구름 위의 용 친구",
    description: "외로운 꼬마 용과 친구가 되어 하늘을 여행하는 이야기",
    background: "from-amber-100 to-yellow-100",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf1] text-slate-900">
      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="UriNuri 홈"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-xl shadow-lg shadow-violet-200">
            🌍
          </span>

          <span>
            <span className="block text-xl font-black tracking-tight text-violet-700">
              UriNuri
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
              Our World, Our Story
            </span>
          </span>
        </Link>

        <Link
          href="/create"
          className="hidden rounded-full border border-violet-200 bg-white/80 px-5 py-2.5 text-sm font-bold text-violet-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md sm:inline-flex"
        >
          이야기 만들기
        </Link>
      </header>

      <section className="relative">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-yellow-200/50 blur-3xl" />
        <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-violet-200/50 blur-3xl" />
        <div className="absolute right-1/3 top-1/2 h-52 w-52 rounded-full bg-pink-200/40 blur-3xl" />

        <div className="relative mx-auto grid min-h-[680px] w-full max-w-7xl items-center gap-12 px-6 pb-24 pt-12 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-bold text-violet-700 shadow-sm backdrop-blur">
              <span>✨</span>
              <span>AI로 만드는 우리 아이의 첫 번째 세계 여행</span>
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.12] tracking-[-0.04em] text-slate-900 md:text-6xl lg:text-7xl">
              오늘은 어떤 세상으로
              <span className="mt-2 block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">
                모험을 떠나볼까요?
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg font-medium leading-8 text-slate-600 md:text-xl">
              나라와 주인공, 모험을 고르면 UriNuri가 우리 아이만을 위한
              특별한 이야기와 삽화를 만들어 줍니다.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/create"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-violet-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-violet-200 transition hover:-translate-y-1 hover:bg-violet-700 hover:shadow-2xl"
              >
                내 이야기 만들기
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <p className="text-center text-sm font-semibold text-slate-500 sm:text-left">
                회원가입 없이 바로 시작할 수 있어요
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-slate-600">
              <span className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs">
                  ✓
                </span>
                아이 맞춤 이야기
              </span>

              <span className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs">
                  ✓
                </span>
                문화와 만나는 모험
              </span>

              <span className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs">
                  ✓
                </span>
                AI 삽화
              </span>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center">
            <div className="absolute left-4 top-8 rotate-[-10deg] rounded-3xl bg-white p-4 shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-4xl">
                🏯
              </div>
            </div>

            <div className="absolute bottom-14 right-0 rotate-[9deg] rounded-3xl bg-white p-4 shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-4xl">
                🐉
              </div>
            </div>

            <div className="relative w-[86%] rotate-[2deg] rounded-[2.5rem] border-[10px] border-white bg-gradient-to-br from-violet-500 via-fuchsia-400 to-orange-300 p-5 shadow-[0_30px_80px_rgba(109,40,217,0.28)]">
              <div className="relative min-h-[460px] overflow-hidden rounded-[1.9rem] bg-gradient-to-b from-sky-200 via-orange-100 to-amber-100 p-7">
                <div className="absolute -left-12 top-20 h-40 w-40 rounded-full bg-white/30" />
                <div className="absolute -right-16 top-8 h-56 w-56 rounded-full bg-yellow-200/50" />

                <div className="relative flex justify-between">
                  <span className="rounded-full bg-white/80 px-4 py-2 text-xs font-black text-violet-700 shadow-sm backdrop-blur">
                    오늘의 이야기
                  </span>
                  <span className="text-3xl">☀️</span>
                </div>

                <div className="relative mt-10 text-center">
                  <div className="text-8xl md:text-9xl">🧒🏻</div>
                  <div className="-mt-2 text-6xl">🦊</div>

                  <div className="mx-auto mt-6 max-w-xs rounded-3xl bg-white/85 p-5 shadow-lg backdrop-blur">
                    <p className="text-sm font-bold text-violet-600">
                      한국으로 떠나는 모험
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                      달빛 궁궐과
                      <br />
                      비밀의 여우
                    </h2>
                  </div>
                </div>

                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-3 text-4xl">
                  <span>🌳</span>
                  <span>🌸</span>
                  <span>🏯</span>
                  <span>🌳</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-violet-600">
              Create your story
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              네 번의 선택으로 완성되는
              <br />
              단 하나의 이야기
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              복잡한 입력은 필요하지 않습니다. 아이가 좋아하는 것을 직접
              고르면 이야기가 시작됩니다.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {storySteps.map((step) => (
              <article
                key={step.number}
                className="group rounded-[2rem] border border-slate-100 bg-[#fffdf8] p-6 shadow-sm transition hover:-translate-y-2 hover:border-violet-100 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-3xl transition group-hover:scale-110">
                    {step.emoji}
                  </span>
                  <span className="text-sm font-black text-violet-300">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-black text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f2ff] px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-violet-600">
                Explore new worlds
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                이야기를 따라 만나는 새로운 세상
              </h2>
            </div>

            <p className="max-w-md text-lg leading-8 text-slate-600">
              문화는 공부해야 하는 주제가 아니라, 재미있는 이야기 속에서
              자연스럽게 발견하는 경험이 됩니다.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredWorlds.map((world) => (
              <article
                key={world.country}
                className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className={`flex h-56 items-center justify-center bg-gradient-to-br ${world.background}`}
                >
                  <span className="text-8xl transition duration-300 group-hover:scale-110">
                    {world.flag}
                  </span>
                </div>

                <div className="p-7">
                  <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-black text-violet-700">
                    {world.country}
                  </span>
                  <h3 className="mt-5 text-2xl font-black text-slate-900">
                    {world.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {world.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-slate-950 px-7 py-14 text-center text-white shadow-2xl md:px-16 md:py-20">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
            Every child has a world of their own
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
            아이의 상상이
            <br className="sm:hidden" />
            하나의 세상이 되는 순간
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            UriNuri에서 오늘의 첫 번째 이야기를 만들어 보세요.
          </p>

          <Link
            href="/create"
            className="mt-9 inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 font-black text-violet-700 transition hover:-translate-y-1 hover:bg-violet-50"
          >
            지금 모험 시작하기
            <span>→</span>
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="font-black text-violet-700">UriNuri</p>
          <p className="text-sm font-medium text-slate-500">
            Story first. Culture follows.
          </p>
        </div>
      </footer>
    </main>
  );
}