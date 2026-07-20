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
  | "moonlit-forest";
export type ThemeId =
  | "friendship"
  | "courage"
  | "kindness"
  | "justice"
  | "teamwork"
  | "hope";
export type MoodId =
  | "warm-heartfelt"
  | "funny"
  | "mysterious"
  | "adventurous"
  | "emotional"
  | "magical";
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
  | "story";

export type StorySelections = {
  country: CountryId | null;
  character: CharacterId | null;
  adventure: AdventureId | null;
  theme: ThemeId | null;
  mood: MoodId | null;
  length: LengthId | null;
  intro: string;
  directionOptions: string[];
  selectedDirection: string | null;
  story: string;
};

export type StoryOption = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  iconBackground: string;
  sceneClass?: string;
};

export type CharacterPose =
  | "idle"
  | "walk_1"
  | "walk_2"
  | "jump"
  | "happy"
  | "surprised"
  | "fly_1"
  | "fly_2";

export type CharacterOption = StoryOption & {
  assetFolder: CharacterId;
};

export type CharacterAssetMap = Partial<Record<CharacterPose, string>>;
