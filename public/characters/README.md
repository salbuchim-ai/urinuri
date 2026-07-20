# UriNuri character assets

These folders are reserved for the official UriNuri pixel-art sprites. The uploaded character sheets are the visual reference and must not be replaced with a different art style.

Each character can provide the pixel-perfect PNG poses that fit its movement set:

```text
idle.png
walk_1.png
walk_2.png
jump.png
happy.png
surprised.png
fly_1.png
fly_2.png
```

Use nearest-neighbor export and keep the thick outlines, limited palettes, proportions, and expressive GBA-style presentation from the reference sheets. Until the individual sprites are supplied, the app shows an explicit placeholder through `CharacterSprite.tsx`.
