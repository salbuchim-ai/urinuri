import type { CharacterAssetMap, CharacterId, CharacterPose } from "@/types/story";

export const characterPoses: CharacterPose[] = [
  "idle",
  "walk_1",
  "walk_2",
  "jump",
  "happy",
  "surprised",
  "fly_1",
  "fly_2",
];

export const characterAssets: Record<CharacterId, CharacterAssetMap> = {
  tiger: {
    idle: "/characters/tiger/idle.png",
    walk_1: "/characters/tiger/walk_1.png",
    walk_2: "/characters/tiger/walk_2.png",
    jump: "/characters/tiger/jump.png",
    happy: "/characters/tiger/happy.png",
    surprised: "/characters/tiger/surprised.png",
  },
  rabbit: {
    idle: "/characters/rabbit/idle.png",
    walk_1: "/characters/rabbit/walk_1.png",
    walk_2: "/characters/rabbit/walk_2.png",
  },
  dragon: {
    fly_1: "/characters/dragon/fly_1.png",
    fly_2: "/characters/dragon/fly_2.png",
  },
  crow: {
    idle: "/characters/crow/idle.png",
    walk_1: "/characters/crow/walk_1.png",
    walk_2: "/characters/crow/walk_2.png",
    happy: "/characters/crow/happy.png",
    surprised: "/characters/crow/surprised.png",
  },
  monkey: {
    idle: "/characters/monkey/idle.png",
    walk_1: "/characters/monkey/walk_1.png",
    walk_2: "/characters/monkey/walk_2.png",
    jump: "/characters/monkey/jump.png",
    happy: "/characters/monkey/happy.png",
    surprised: "/characters/monkey/surprised.png",
  },
  fox: {
    idle: "/characters/fox/idle.png",
    walk_1: "/characters/fox/walk_1.png",
    walk_2: "/characters/fox/walk_2.png",
    jump: "/characters/fox/jump.png",
    happy: "/characters/fox/happy.png",
    surprised: "/characters/fox/surprised.png",
  },
  panda: {
    idle: "/characters/panda/idle.png",
    walk_1: "/characters/panda/walk_1.png",
    walk_2: "/characters/panda/walk_2.png",
    happy: "/characters/panda/happy.png",
  },
  bear: {
    idle: "/characters/bear/idle.png",
    walk_1: "/characters/bear/walk_1.png",
    walk_2: "/characters/bear/walk_2.png",
    happy: "/characters/bear/happy.png",
  },
  deer: {
    idle: "/characters/deer/idle.png",
    walk_1: "/characters/deer/walk_1.png",
    walk_2: "/characters/deer/walk_2.png",
    happy: "/characters/deer/happy.png",
  },
  goldfish: {
    idle: "/characters/goldfish/idle.png",
    walk_1: "/characters/goldfish/walk_1.png",
    walk_2: "/characters/goldfish/walk_2.png",
    happy: "/characters/goldfish/happy.png",
  },
  haetae: {
    idle: "/characters/haetae/idle.png",
    walk_1: "/characters/haetae/walk_1.png",
    walk_2: "/characters/haetae/walk_2.png",
    happy: "/characters/haetae/happy.png",
  },
  crane: {
    idle: "/characters/crane/idle.png",
    walk_1: "/characters/crane/walk_1.png",
    walk_2: "/characters/crane/walk_2.png",
    happy: "/characters/crane/happy.png",
  },
  squirrel: {
    idle: "/characters/squirrel/idle.png",
    walk_1: "/characters/squirrel/walk_1.png",
    walk_2: "/characters/squirrel/walk_2.png",
    happy: "/characters/squirrel/happy.png",
  },
  girin: {
    idle: "/characters/girin/idle.png",
    walk_1: "/characters/girin/walk_1.png",
    walk_2: "/characters/girin/walk_2.png",
    happy: "/characters/girin/happy.png",
  },
};

export function getCharacterAssetPath(
  characterId: CharacterId,
  pose: CharacterPose = "idle",
) {
  const assets = characterAssets[characterId];
  return assets[pose] ?? assets.idle ?? assets.fly_1 ?? Object.values(assets)[0] ?? null;
}
