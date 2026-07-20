"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type {
  StoryDraftKey,
  StorySelectionKey,
  StorySelections,
} from "@/types/story";

const initialSelections: StorySelections = {
  country: null,
  character: null,
  adventure: null,
  theme: null,
  mood: null,
  length: null,
  intro: "",
  directionOptions: [],
  selectedDirection: null,
  story: "",
};

type StoryFlowContextValue = {
  selections: StorySelections;
  setSelection: (key: StorySelectionKey, value: string) => void;
  setStoryPart: (key: StoryDraftKey, value: string | string[]) => void;
  resetSelections: () => void;
};

const StoryFlowContext = createContext<StoryFlowContextValue | null>(null);

export function StoryFlowProvider({ children }: { children: React.ReactNode }) {
  const [selections, setSelections] = useState<StorySelections>(initialSelections);

  const value = useMemo<StoryFlowContextValue>(
    () => ({
      selections,
      setSelection: (key, value) => {
        setSelections((current) => ({
          ...current,
          [key]: value,
          intro: "",
          directionOptions: [],
          selectedDirection: null,
          story: "",
        }));
      },
      setStoryPart: (key, value) => {
        setSelections((current) => ({ ...current, [key]: value }));
      },
      resetSelections: () => setSelections({ ...initialSelections }),
    }),
    [selections],
  );

  return <StoryFlowContext.Provider value={value}>{children}</StoryFlowContext.Provider>;
}

export function useStoryFlow() {
  const context = useContext(StoryFlowContext);

  if (!context) {
    throw new Error("useStoryFlow must be used within a StoryFlowProvider");
  }

  return context;
}
