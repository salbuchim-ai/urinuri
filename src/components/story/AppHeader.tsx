"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ConfirmationDialog, SettingsDialog } from "@/components/story/ModalDialog";
import { useStoryFlow } from "@/components/story/StoryFlowProvider";
import { getWorldStory } from "@/data/world-stories";

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/create/country": "1. Country",
  "/create/character": "2. Character",
  "/create/adventure": "3. Adventure",
  "/create/mood": "4. Story Mood",
  "/create/theme": "5. Theme",
  "/create/length": "6. Story Length",
  "/story/result": "7. Story Result",
  "/story/direction": "7. Story Result",
  "/story/generating": "7. Story Result",
  "/story/demo": "7. Story Result",
};

function getPageTitle(pathname: string) {
  const staticTitle = pageTitles[pathname];
  if (staticTitle) return staticTitle;
  if (pathname === "/stories/world") return "Stories Around the World";
  if (pathname === "/stories/my") return "My Stories";

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 3 && segments[0] === "stories") {
    const story = getWorldStory(decodeURIComponent(segments[1]), decodeURIComponent(segments[2]));
    if (story) return story.title;
  }

  return "UriNuri";
}

export function AppHeader() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const { resetSelections } = useStoryFlow();
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [homeDialogOpen, setHomeDialogOpen] = useState(false);

  const title = getPageTitle(pathname);
  const isHome = pathname === "/";

  function closeSettings() {
    setSettingsOpen(false);
    window.setTimeout(() => settingsButtonRef.current?.focus(), 0);
  }

  function handleHomeClick() {
    if (isHome) {
      router.push("/");
      return;
    }

    setHomeDialogOpen(true);
  }

  function confirmGoHome() {
    resetSelections();
    setHomeDialogOpen(false);
    router.push("/");
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-[#eaf8ff]/95 px-3 py-2 backdrop-blur">
        <div className="mx-auto flex min-h-10 w-full max-w-[760px] items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleHomeClick}
            aria-label="Go to Home"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-sky-950 bg-white text-sky-950 transition hover:bg-sky-50 active:scale-[0.96] focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <HomeIcon />
          </button>
          <h1 className="min-w-0 flex-1 truncate text-center text-base font-black text-slate-950">
            {title}
          </h1>
          <button
            ref={settingsButtonRef}
            type="button"
            onClick={() => setSettingsOpen(true)}
            aria-label="Open Settings"
            aria-haspopup="dialog"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-sky-950 bg-white text-sky-950 transition hover:bg-sky-50 active:scale-[0.96] focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <SettingsIcon />
          </button>
        </div>
      </header>

      <ConfirmationDialog
        open={homeDialogOpen}
        title="Return to Home?"
        message="Your current story progress will be lost."
        cancelLabel="Cancel"
        confirmLabel="Go Home"
        onCancel={() => setHomeDialogOpen(false)}
        onConfirm={confirmGoHome}
      />
      <SettingsDialog open={settingsOpen} onClose={closeSettings} />
    </>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a2 2 0 0 0-3.4 1.4v.2a2 2 0 1 1-4 0v-.2a2 2 0 0 0-3.4-1.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A2 2 0 0 0 3.6 12a2 2 0 0 0-.6-1.4l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A2 2 0 0 0 9.2 6.4h.2a2 2 0 0 0 1.4-2V4a2 2 0 1 1 4 0v.2a2 2 0 0 0 1.4 2 2 2 0 0 0 1.4-.6l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a2 2 0 0 0-.6 1.4v.2a2 2 0 0 0 2 1.4h.2a2 2 0 1 1 0 4h-.2a2 2 0 0 0-2 1.4Z" />
    </svg>
  );
}
