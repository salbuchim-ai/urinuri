import type { CharacterAssetMap, CharacterId, CharacterPose } from "@/types/story";

export const characterPoses: CharacterPose[] = ["front", "side", "back", "action"];

export const characterAssets: Partial<Record<CharacterId, CharacterAssetMap>> = {
  bear: {
    front: "/characters/bear/front.png",
    side: "/characters/bear/side.png",
    back: "/characters/bear/back.png",
    action: "/characters/bear/action.png",
  },
  crow: {
    front: "/characters/crow/front.png",
    side: "/characters/crow/side.png",
    back: "/characters/crow/back.png",
    action: "/characters/crow/action.png",
  },
  deer: {
    front: "/characters/deer/front.png",
    side: "/characters/deer/side.png",
    back: "/characters/deer/back.png",
    action: "/characters/deer/action.png",
  },
  dragon: {
    front: "/characters/dragon/front.png",
    side: "/characters/dragon/side.png",
    back: "/characters/dragon/back.png",
    action: "/characters/dragon/action.png",
  },
  fox: {
    front: "/characters/fox/front.png",
    side: "/characters/fox/side.png",
    back: "/characters/fox/back.png",
    action: "/characters/fox/action.png",
  },
  girin: {
    front: "/characters/girin/front.png",
    side: "/characters/girin/side.png",
    back: "/characters/girin/back.png",
    action: "/characters/girin/action.png",
  },
  monkey: {
    front: "/characters/monkey/front.png",
    side: "/characters/monkey/side.png",
    back: "/characters/monkey/back.png",
    action: "/characters/monkey/action.png",
  },
  panda: {
    front: "/characters/panda/front.png",
    side: "/characters/panda/side.png",
    back: "/characters/panda/back.png",
    action: "/characters/panda/action.png",
  },
  rabbit: {
    front: "/characters/rabbit/front.png",
    side: "/characters/rabbit/side.png",
    back: "/characters/rabbit/back.png",
    action: "/characters/rabbit/action.png",
  },
  squirrel: {
    front: "/characters/squirrel/front.png",
    side: "/characters/squirrel/side.png",
    back: "/characters/squirrel/back.png",
    action: "/characters/squirrel/action.png",
  },
  tiger: {
    front: "/characters/tiger/front.png",
    side: "/characters/tiger/side.png",
    back: "/characters/tiger/back.png",
    action: "/characters/tiger/action.png",
  },
};

export function getCharacterAssetPath(
  characterId: CharacterId,
  pose: CharacterPose = "front",
) {
  const assets = characterAssets[characterId];
  return assets?.[pose] ?? assets?.front ?? null;
}
