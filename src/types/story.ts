export type CountryId = "korea" | "japan" | "china";
export type CharacterId =
  | "tiger"
  | "dragon"
  | "crow"
  | "monkey"
  | "fox"
  | "rabbit"
  | "panda"
  | "bear"
  | "deer"
  | "goldfish"
  | "haetae"
  | "crane"
  | "squirrel"
  | "girin";
export type AdventureId =
  | "mystic-mountain"
  | "underwater-kingdom"
  | "moonlit-forest"
  | "near-village";
export type ThemeId =
  | "friendship"
  | "courage"
  | "kindness"
  | "teamwork"
  | "honesty"
  | "curiosity";
export type MoodId =
  | "funny"
  | "cozy"
  | "mysterious"
  | "exciting"
  | "magical"
  | "brave";
export type LengthId = "short" | "long" | "series";

export type StorySelectionKey =
  | "country"
  | "character"
  | "adventure"
  | "theme"
  | "mood"
  | "length";

export type StoryDraftKey =
  | "intro"
  | "directionOptions"
  | "selectedDirection"
  | "story"
  | "storyEpisodes"
  | "generationMode";

export type StorySelections = {
  country: CountryId | null;
  character: CharacterId | null;
  characters: CharacterId[];
  adventure: AdventureId | null;
  theme: ThemeId | null;
  mood: MoodId | null;
  length: LengthId | null;
  intro: string;
  directionOptions: string[];
  selectedDirection: string | null;
  story: string;
  storyEpisodes: string[];
  generationMode: "live" | "demo";
};

export type StoryOption = {
  id: string;
  title: string;
  description: string;
  iconBackground: string;
  iconSrc?: string;
  sceneClass?: string;
};

export type CharacterPose =
  | "front"
  | "side"
  | "back"
  | "action"
  | "blink";

export type CharacterOption = StoryOption & {
  assetFolder: CharacterId;
  display?: CharacterDisplayConfig;
};

export type CharacterDisplayConfig = {
  cardFrontScale?: number;
  cardFrontOffsetX?: number;
  blinkDelay?: string;
  blink?: CharacterBlinkConfig;
};

export type CharacterBlinkConfig = {
  maskColor: string;
  lineColor: string;
  delay?: string;
  left: CharacterBlinkEye;
  right: CharacterBlinkEye;
};

export type CharacterBlinkEye = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type CharacterAssetMap = Partial<Record<CharacterPose, string>>;

export type SavedStory = {
  id: string;
  title: string;
  createdAt: string;
  country: CountryId;
  characters: CharacterId[];
  adventure: AdventureId;
  mood: MoodId;
  theme: ThemeId;
  storyLength: LengthId;
  openingScene: string;
  selectedChoice: string;
  generatedContinuation: string;
  illustrationPath?: string;
  lesson?: string;
  choiceOptions?: string[];
  updatedAt?: string;
};
