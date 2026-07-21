import type { AdventureId, LengthId, MoodId, ThemeId, StoryOption } from "@/types/story";

type ThemeProfile = {
  action: string;
  lesson: string;
  choiceActions: string[];
};

type MoodProfile = {
  opening: string;
  story: string;
};

type ChoiceBuilder = (themeAction: string) => string;

type AdventureProfile = {
  timeCue: string;
  setting: string;
  trail: string;
  clue: string;
  helper: string;
  obstacle: string;
  solution: string;
  ending: string;
  choiceBuilders: ChoiceBuilder[];
  seriesChoiceBuilders: ChoiceBuilder[];
};

const themeProfiles: Record<ThemeId, ThemeProfile> = {
  friendship: {
    action: "invite the new friend to join the plan",
    lesson: "friendship grows when everyone gets a place",
    choiceActions: ["ask the owl to join the adventure", "make room for a new friend", "listen to the new friend's idea"],
  },
  courage: {
    action: "take the first brave step",
    lesson: "courage can begin with one careful step",
    choiceActions: ["step onto the bridge first", "keep going when the path twists", "try one brave solution"],
  },
  kindness: {
    action: "offer gentle care before asking for anything",
    lesson: "kindness can make a difficult path feel lighter",
    choiceActions: ["offer the owl a safe place to rest", "repair the path for the next traveler", "share the warmest lantern"],
  },
  teamwork: {
    action: "combine each person's special skill",
    lesson: "a team becomes strong when every skill matters",
    choiceActions: ["combine everyone's special skill", "give each friend a useful role", "solve the problem together"],
  },
  honesty: {
    action: "tell the truth about the missing clue",
    lesson: "honesty helps good friends solve problems together",
    choiceActions: ["tell the truth about the missing clue", "admit what you do not know", "share the real story"],
  },
  curiosity: {
    action: "ask a careful question and listen to its answer",
    lesson: "curiosity opens doors that guessing cannot",
    choiceActions: ["ask a careful question", "look closely for a hidden clue", "follow the answer wherever it leads"],
  },
};

const moodProfiles: Record<MoodId, MoodProfile> = {
  funny: {
    opening: "A playful breeze tugged at their ears and made the map wiggle like it was tickled.",
    story: "Even the biggest obstacle seemed to have a silly side",
  },
  cozy: {
    opening: "A warm hush wrapped around the path, as comforting as a favorite blanket.",
    story: "The gentle quiet helped everyone notice small signs of hope",
  },
  mysterious: {
    opening: "Every shadow seemed to hide a clue, and every quiet sound invited a question.",
    story: "The strange clues made the journey feel like a puzzle waiting to be solved",
  },
  exciting: {
    opening: "A sudden gust sent sparkling dust across the path and made the adventure feel wonderfully close.",
    story: "The surprise made the journey feel fast and thrilling",
  },
  magical: {
    opening: "The air shimmered with tiny lights, as if the world had just opened a secret storybook.",
    story: "The magic made ordinary things glow with new possibilities",
  },
  brave: {
    opening: "The unknown path felt big, but a steady little courage began to glow in their hearts.",
    story: "The uncertain path reminded everyone that brave choices can start quietly",
  },
};

const adventureProfiles: Record<AdventureId, AdventureProfile> = {
  "mystic-mountain": {
    timeCue: "the first gold of dawn warmed the peaks",
    setting: "Clouds curled around the mountain trail like soft white rivers",
    trail: "a rope bridge floating above the clouds",
    clue: "a brass bell from a path missing on every old map",
    helper: "a young cloud-goat with a blue ribbon",
    obstacle: "a cracked wind bridge swayed above a sea of clouds",
    solution: "Together, they tied a safe new railing from the blue ribbon and strong mountain vines.",
    ending: "At sunset, the brass bell rang once more, sending a warm echo across the peaks.",
    choiceBuilders: [
      (themeAction) => `Follow the rope bridge toward a bell above the clouds and ${themeAction}.`,
      (themeAction) => `Study the glowing footprints beside the cliff until you discover who left them, then ${themeAction}.`,
      (themeAction) => `Climb to the eagle's lookout to read a map hidden in the wind and remember to ${themeAction}.`,
      (themeAction) => `Guide a lost cloud-goat through a maze of stones before the next gust arrives, and ${themeAction}.`,
      (themeAction) => `Solve the mountain keeper's three-note riddle to open a secret garden, choosing to ${themeAction}.`,
      (themeAction) => `Build a safe path around a fallen tree with the birds watching, so everyone can ${themeAction}.`,
    ],
    seriesChoiceBuilders: [
      (themeAction) => `Explore the hidden observatory beyond the clouds and ${themeAction}.`,
      (themeAction) => `Return a little sky-mouse's missing star-map before the next wind arrives, then ${themeAction}.`,
      (themeAction) => `Follow a trail of warm lanterns to a mountain garden and ${themeAction}.`,
      (themeAction) => `Help a young kite-maker send a message across the peaks, choosing to ${themeAction}.`,
      (themeAction) => `Open a snow-bright door beneath the old lookout and remember to ${themeAction}.`,
      (themeAction) => `Listen for a bell inside the echoing caves, then ${themeAction}.`,
    ],
  },
  "underwater-kingdom": {
    timeCue: "sunbeams danced through the blue water",
    setting: "Coral towers shimmered below them like stained-glass castles",
    trail: "a glowing current between the coral towers",
    clue: "a pearl compass aimed at a locked shell gate",
    helper: "a shy seahorse carrying a tiny silver key",
    obstacle: "a drifting kelp maze covered the only route to the shell gate",
    solution: "The friends followed the seahorse's signals and gently untangled the kelp without harming a single nest.",
    ending: "When the water turned deep blue, the shell gate opened and released a chorus of bright bubbles.",
    choiceBuilders: [
      (themeAction) => `Follow a trail of bubbles to a locked shell gate and ${themeAction}.`,
      (themeAction) => `Ask the coral librarian why one story is missing, then ${themeAction}.`,
      (themeAction) => `Rescue a shy seahorse from a drifting kelp maze and remember to ${themeAction}.`,
      (themeAction) => `Race a playful current to return a pearl compass, remembering to ${themeAction}.`,
      (themeAction) => `Build a team of reef creatures to light the dark tunnel and ${themeAction}.`,
      (themeAction) => `Listen to the whale bells before opening the royal door, choosing to ${themeAction}.`,
    ],
    seriesChoiceBuilders: [
      (themeAction) => `Visit the singing shell library where one book is glowing, then ${themeAction}.`,
      (themeAction) => `Guide a baby sea turtle through a garden of floating lights and ${themeAction}.`,
      (themeAction) => `Search the pearl orchard for a missing blue seed, choosing to ${themeAction}.`,
      (themeAction) => `Follow a friendly ray into a quiet underwater canyon and remember to ${themeAction}.`,
      (themeAction) => `Repair a coral music bridge before the evening current arrives, then ${themeAction}.`,
      (themeAction) => `Unlock a small room beneath the tide-clock and ${themeAction}.`,
    ],
  },
  "moonlit-forest": {
    timeCue: "silver moonlight painted the leaves",
    setting: "Fireflies blinked between the whispering trees of Moonlit Forest",
    trail: "a ribbon of blue fireflies under the old trees",
    clue: "a sleeping lantern-flower",
    helper: "a lost owl with one bright feather",
    obstacle: "a tangle of thorny vines covered the only path to the hidden clearing",
    solution: "The friends hummed softly until the vines loosened, then guided the owl by following its bright feather.",
    ending: "Before dawn, the lantern-flower opened and filled the forest with a gentle silver glow.",
    choiceBuilders: [
      (themeAction) => `Follow blue fireflies to help a lost owl find the tree that remembers every promise, and ${themeAction}.`,
      (themeAction) => `Listen to the oldest whispering tree and solve its leaf-shaking riddle before the moon slips behind a cloud, then ${themeAction}.`,
      (themeAction) => `Build a bridge of fallen branches with forest animals so the golden map can reach a hidden clearing, then ${themeAction}.`,
      (themeAction) => `Return a glowing moon-seed to the nest it belongs in, even as a playful breeze sends it away, and ${themeAction}.`,
      (themeAction) => `Track silver paw prints to a quiet pond where a shy creature needs a name, then ${themeAction}.`,
      (themeAction) => `Trade a silly song for a secret lantern from the night moths, and use its light to ${themeAction}.`,
    ],
    seriesChoiceBuilders: [
      (themeAction) => `Follow a silver moth to a hidden midnight market and ${themeAction}.`,
      (themeAction) => `Deliver a dream-seed to a sleepy tree on the far side of the forest, then ${themeAction}.`,
      (themeAction) => `Ask the moonlit pond why it is reflecting a place no one knows, and ${themeAction}.`,
      (themeAction) => `Help a family of hedgehogs prepare a lantern picnic beneath the stars, choosing to ${themeAction}.`,
      (themeAction) => `Find the keeper of the quiet bell tower before the last firefly fades, then ${themeAction}.`,
      (themeAction) => `Read a new constellation drawn between the branches and remember to ${themeAction}.`,
    ],
  },
  "near-village": {
    timeCue: "late-afternoon sunlight warmed the village rooftops",
    setting: "A green woodland opened into a friendly village beside a sparkling stream",
    trail: "a sunny path winding over the little village bridge",
    clue: "a tiny golden bell beside the village well",
    helper: "a young village fox carrying a blue ribbon",
    obstacle: "a sudden spring shower washed away the bridge planks before the village festival",
    solution: "The friends gathered smooth branches, tied them with strong vines, and rebuilt the bridge one safe plank at a time.",
    ending: "As evening settled over the village, warm lanterns glowed in every window and the new bridge shone beside the stream.",
    choiceBuilders: [
      (themeAction) => `Follow the sunny path to the village well and ${themeAction}.`,
      (themeAction) => `Help the young fox prepare the village festival before the first lantern is lit, then ${themeAction}.`,
      (themeAction) => `Cross the little stream to find who left a golden bell by the bridge, and ${themeAction}.`,
      (themeAction) => `Search the old orchard for a missing basket of storybooks and remember to ${themeAction}.`,
      (themeAction) => `Build a safe shortcut through the meadow so every neighbor can reach the village square and ${themeAction}.`,
      (themeAction) => `Listen to the village baker's riddle about the secret garden, choosing to ${themeAction}.`,
    ],
    seriesChoiceBuilders: [
      (themeAction) => `Prepare a surprise lantern parade for the village children and ${themeAction}.`,
      (themeAction) => `Visit the old windmill to discover who has been leaving blue ribbons, then ${themeAction}.`,
      (themeAction) => `Help the orchard keeper find a storybook hidden among the apple trees and ${themeAction}.`,
      (themeAction) => `Follow a trail of painted stones beyond the village bridge, choosing to ${themeAction}.`,
      (themeAction) => `Build a tiny stage for the evening storytellers and remember to ${themeAction}.`,
      (themeAction) => `Ask the stream where its silver pebble came from, then ${themeAction}.`,
    ],
  },
};

export function buildIntro(
  country: StoryOption,
  characters: StoryOption[],
  adventure: StoryOption,
  mood: StoryOption,
) {
  const characterNames = formatCharacterNames(characters);
  const world = getAdventureProfile(adventure.id);
  const moodProfile = getMoodProfile(mood.id);

  return [
    `${characterNames} woke in ${country.title} as ${world.timeCue}. ${world.setting}.`,
    `${moodProfile.opening} A tiny golden map glowed beside ${world.clue}. ${characterNames} followed it toward ${world.trail}, where ${world.helper} was waiting for help.`,
  ].join("\n\n");
}

export function buildDirections(adventure: StoryOption, theme: StoryOption, mood?: StoryOption) {
  const world = getAdventureProfile(adventure.id);
  const themeProfile = getThemeProfile(theme.id);
  const seed = stableHash(`${adventure.id}:${theme.id}:${mood?.id ?? "default"}`);
  const orderedBuilders = world.choiceBuilders
    .map((_, index) => ({ index, rank: stableHash(`${seed}:${index}`) }))
    .sort((left, right) => left.rank - right.rank)
    .slice(0, 3)
    .map(({ index }) => world.choiceBuilders[index]);

  return orderedBuilders.map((buildChoice, index) => buildChoice(themeProfile.choiceActions[index % themeProfile.choiceActions.length]));
}

export function buildSeriesDirections(adventure: StoryOption, theme: StoryOption, mood: StoryOption, episode: number) {
  const world = getAdventureProfile(adventure.id);
  const themeProfile = getThemeProfile(theme.id);
  const seed = stableHash(`${adventure.id}:${theme.id}:${mood.id}:series`);
  const seriesBuilders = world.seriesChoiceBuilders;
  const orderedBuilders = seriesBuilders
    .map((_, index) => ({ index, rank: stableHash(`${seed}:${index}`) }))
    .sort((left, right) => left.rank - right.rank)
    .slice(((Math.max(episode, 2) - 2) * 3) % seriesBuilders.length, ((Math.max(episode, 2) - 2) * 3) % seriesBuilders.length + 3);

  if (orderedBuilders.length < 3) {
    const remaining = seriesBuilders
      .map((_, index) => ({ index, rank: stableHash(`${seed}:remaining:${index}`) }))
      .sort((left, right) => left.rank - right.rank)
      .slice(0, 3 - orderedBuilders.length);
    orderedBuilders.push(...remaining);
  }

  return orderedBuilders.map(({ index }, optionIndex) => seriesBuilders[index](themeProfile.choiceActions[(optionIndex + episode - 2) % themeProfile.choiceActions.length]));
}

export function buildStory(
  country: StoryOption,
  characters: StoryOption[],
  adventure: StoryOption,
  theme: StoryOption,
  mood: StoryOption,
  direction: string,
  length: LengthId = "short",
) {
  const characterNames = formatCharacterNames(characters);
  const world = getAdventureProfile(adventure.id);
  const themeProfile = getThemeProfile(theme.id);
  const moodProfile = getMoodProfile(mood.id);

  const story = [
    `${characterNames} followed the chosen plan: ${direction} The path led from ${country.title} toward ${world.trail}, where ${world.obstacle}.`,
    `${world.helper} watched carefully from the edge of the path. ${moodProfile.story}, but ${characterNames} decided to ${themeProfile.action}.`,
    `${world.solution} Along the way, they discovered that ${themeProfile.lesson}. The golden map opened to reveal one final star.`,
    `${world.ending} ${characterNames} carried the new lesson home, ready for the next page and another story made together.`,
  ];

  if (length === "long") {
    story.push(
      `The friends expected the golden map to fade, but a second trail appeared beside ${world.trail}. It curled past a quiet lookout, a new symbol, and a door-shaped shadow in the distance. Each new sign reminded them that the first problem had only opened the adventure.`,
      `${characterNames} found a quiet place to rest and shared what they had learned. They practiced listening, checked the map together, and left a safe marker for anyone who might follow. Far away, something answered with a gentle sound.`,
      `The world around them filled with tiny lights as the friends looked toward the next trail. This is the end of this demo chapter, but the map still has blank pages waiting for a longer adventure...`,
    );
  }

  if (length === "series") {
    story.push(
      `Just as the first mystery seemed solved, the golden map drew a new symbol beyond ${world.trail}. ${characterNames} heard a quiet call from the distance and knew that another episode was waiting.`,
      `This episode ends here with a new clue, not a final goodbye. Choose the next episode below to decide where the adventure goes next...`,
    );
  }

  return story.join("\n\n");
}

export function buildSeriesEpisode(
  country: StoryOption,
  characters: StoryOption[],
  adventure: StoryOption,
  theme: StoryOption,
  mood: StoryOption,
  direction: string,
  episode: number,
) {
  const characterNames = formatCharacterNames(characters);
  const world = getAdventureProfile(adventure.id);
  const themeProfile = getThemeProfile(theme.id);
  const moodProfile = getMoodProfile(mood.id);

  return [
    `Episode ${episode} began when ${characterNames} followed this new path: ${direction} The trail led away from ${country.title} toward ${world.clue}.`,
    `${world.helper} returned with a fresh question. ${moodProfile.story}, so ${characterNames} worked together to ${themeProfile.action}. ${world.solution}`,
    `The new clue glowed brighter, but it pointed beyond the edge of the map. ${world.ending} Another episode is waiting whenever the friends are ready...`,
  ].join("\n\n");
}

export function buildTitle(characters: StoryOption[], adventure: StoryOption) {
  return `${formatCharacterNames(characters)} and the Secret of ${adventure.title}`;
}

function getAdventureProfile(id: string) {
  return adventureProfiles[id as AdventureId] ?? adventureProfiles["mystic-mountain"];
}

function getThemeProfile(id: string) {
  return themeProfiles[id as ThemeId] ?? themeProfiles.friendship;
}

function getMoodProfile(id: string) {
  return moodProfiles[id as MoodId] ?? moodProfiles.magical;
}

function stableHash(value: string) {
  let hash = 0;

  for (const character of value) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }

  return hash;
}

function formatCharacterNames(characters: StoryOption[]) {
  if (characters.length <= 1) return characters[0]?.title ?? "Our hero";
  if (characters.length === 2) return `${characters[0].title} and ${characters[1].title}`;

  const lastCharacter = characters[characters.length - 1];
  return `${characters.slice(0, -1).map((character) => character.title).join(", ")}, and ${lastCharacter.title}`;
}
