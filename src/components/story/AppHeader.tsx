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
    <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" className="settings-icon" aria-hidden="true">
      <path d="M19.43 12.98c.04-.32.07-.65.07-.98s-.02-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.37-.31-.6-.22l-2.49 1a7.7 7.7 0 0 0-1.69-.98l-.38-2.65A.51.51 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.08-.48 0-.6.22l-2 3.46c-.12.22-.07.49.12.64l2.11 1.65c-.04.32-.08.65-.08.98s.03.66.08.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.37.31.6.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1c.23.08.48 0 .6-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z" />
    </svg>
  );
}
