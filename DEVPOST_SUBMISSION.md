# UriNuri — Devpost Submission Draft

Use this document as the source copy for the Devpost project page. Replace the two pending links after deployment.

## Project title

UriNuri

## Tagline

A child-friendly pixel-art story studio where every choice shapes the next page.

## Short description

UriNuri helps children create and continue their own stories by choosing a culture-inspired setting, animal characters, adventure, mood, theme, and length. A playful pixel-art flow turns those choices into a story with meaningful decisions.

## What it does

UriNuri is designed for a child and a grown-up to explore together:

- Choose Japan, Korea, or China as the story inspiration.
- Pick one or two animal companions.
- Set the adventure, mood, theme, and story length.
- Read an opening scene, choose a direction, and receive the next part of the story.
- Create a short story, a long story, or a five-episode story series.
- Save up to three finished stories on the device and revisit them later.
- Browse child-friendly previews of traditional stories from around the world.

## Why we built it

Many children love stories but do not always see themselves as storytellers. UriNuri makes authorship feel approachable: the child makes small, concrete choices, and each choice becomes part of the story. The pixel-art interface keeps the experience warm and game-like without turning reading into a competition.

## How it was built

UriNuri is a Next.js App Router application built with React, TypeScript, and Tailwind CSS. The story flow is shared across the setup screens with a small client-side state provider. Finished stories are stored locally in the browser so a child can return to them without creating an account.

The app includes a server-side OpenAI Responses API route for live story generation. For the submitted demo, Demo Mode uses a local story generator so the complete experience remains reliable without API credits. The API key is never sent to the browser.

## Built with

Next.js, React, TypeScript, Tailwind CSS, OpenAI Responses API, localStorage, pixel art

## How to try it

1. Open the live demo.
2. Select Create a Story.
3. Choose Korea, Tiger and Rabbit, Mystic Mountain, Magical, Friendship, and Short Story.
4. Continue to the result screen and choose a story direction.
5. Save the completed story and open My Stories.

The submitted deployment runs in Demo Mode, so no sign-in or API key is required.

## Links

- Live demo: _Add the deployment URL after publishing._
- Source code: https://github.com/salbuchim-ai/urinuri
- Demo video: _Add the public YouTube or Vimeo URL._

## Demo video script — about 75 seconds

**0–8 sec:** Show the pixel-art home screen and explain that UriNuri lets children make a story together.

**8–25 sec:** Select Korea, two animal companions, Mystic Mountain, and a story mood/theme. Highlight that the child controls the ingredients instead of receiving a random story.

**25–42 sec:** Show the opening scene and three possible directions. Choose one path.

**42–58 sec:** Show the generated continuation and the lesson about friendship. If using Story Series, briefly show the next-episode choices.

**58–68 sec:** Save the story, open My Stories, and show that the story can be revisited on the same device.

**68–75 sec:** Return to the world-story library and close with the message: “Every story begins with you.”

## Screenshot checklist

Capture these views for the Devpost image gallery:

1. Home screen with the three main paths.
2. Character selection with two companions selected.
3. Story Result showing the opening scene and three choices.
4. Completed continuation with the Save Your Story action.
5. My Stories with a saved story card.

## Challenges and learnings

The main design challenge was balancing imagination with enough structure for a young reader to understand what to do next. We used a guided four-step setup, clear progress labels, short choices, and a prepared fallback generator so the demo stays coherent even when external services are unavailable.

## Future direction

Future versions can add narration, more languages, richer cultural reading notes, parent controls, and optional cloud sync. The current demo intentionally keeps saved stories local and keeps the interaction focused on making one story at a time.

## Submission checklist

- [ ] Add the public live demo URL.
- [ ] Upload the demo video and add its public URL.
- [ ] Add the five screenshots above.
- [ ] Add team members, country, category, and prize selections required by the hackathon.
- [ ] Add the required sponsor/tool tags.
- [ ] Proofread the rendered Devpost page and submit the project.
