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
  description: string;
  iconBackground: string;
  iconSrc?: string;
  sceneClass?: string;
};

export type CharacterPose =
  | "front"
  | "side"
  | "back"
  | "action";

export type CharacterOption = StoryOption & {
  assetFolder: CharacterId;
};

export type CharacterAssetMap = Partial<Record<CharacterPose, string>>;
