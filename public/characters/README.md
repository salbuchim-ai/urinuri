# UriNuri character assets

Character artwork is served directly from this directory. In the app, use the
public URL without the `public` segment, for example:

```text
/characters/dragon/front.png
```

Available poses are:

```text
front.png
side.png
back.png
action.png
```

The character selection uses the exact `front.png` asset by default. When a
character is selected, its card switches to the matching `action.png` asset
for Tiger, Dragon, Crow, Monkey, Fox, Rabbit, and Panda. Story loading scenes
also use the selected character's exact `action.png` asset.
