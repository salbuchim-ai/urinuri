"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type {
  CharacterId,
  StoryDraftKey,
  StorySelectionKey,
  StorySelections,
} from "@/types/story";

const initialSelections: StorySelections = {
  country: null,
  character: null,
  characters: [],
  adventure: null,
  theme: null,
  mood: null,
  length: null,
  intro: "",
  directionOptions: [],
  selectedDirection: null,
  story: "",
  storyEpisodes: [],
  generationMode: "demo",
};

type StoryFlowContextValue = {
  selections: StorySelections;
  setSelection: (key: StorySelectionKey, value: string) => void;
  toggleCharacterSelection: (characterId: CharacterId) => void;
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
          ...(key === "character"
            ? { character: value as CharacterId, characters: [value as CharacterId] }
            : {}),
          intro: "",
          directionOptions: [],
          selectedDirection: null,
          story: "",
          storyEpisodes: [],
        }));
      },
      toggleCharacterSelection: (characterId) => {
        setSelections((current) => {
          const currentCharacters = current.characters.length
            ? current.characters
            : current.character
              ? [current.character]
              : [];
          const nextCharacters = currentCharacters.includes(characterId)
            ? currentCharacters.filter((id) => id !== characterId)
            : currentCharacters.length < 2
              ? [...currentCharacters, characterId]
              : currentCharacters;

          return {
            ...current,
            character: nextCharacters[0] ?? null,
            characters: nextCharacters,
            intro: "",
            directionOptions: [],
            selectedDirection: null,
            story: "",
            storyEpisodes: [],
          };
        });
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
