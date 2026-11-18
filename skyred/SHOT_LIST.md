# Skyred site: captures to record

All media lives in `skyred/media/`. Record on the iPhone, portrait, final build, pass 4 HUD, no debug overlay, no status bar (or crop it).
The page shows each screen inside a CSS iPhone, so record the full screen, nothing composed around it.
`/skyred/media/*` is cached for a year: give a replaced file a new name (or bump `?v=` where it is used) and update both `index.html` and `fr/index.html`.

| # | Slot (file) | Moment | Length | Notes |
|---|---|---|---|---|
| 1 | `hero.mp4` + `hero-poster.webp` | Low and fast through the alpine valley, a gun kill, then a 4-lock salvo hitting | 12-20 s, seamless loop | Replaces the intro cinematic. H.264, 540 px wide, under 3 MB, silent. Poster = first frame. |
| 2 | `screen-dogfight-{440,880}.webp` | Tail chase over the lake, target in the gun cross, tracers on | still | Replaces store shot 1 (old HUD). |
| 3 | (new) `screen-salvo-{440,880}.webp` | MSL held, four red lock boxes on boats or jets | still | No slot yet: the HUD demo stands in. A phone can go next to it once this exists. |
| 4 | `screen-briefing-{440,880}.webp` | Mission 3 briefing, map tab | still | Current one is usable; re-shoot at native resolution. |
| 5 | `screen-hangar-{440,880}.webp` | Hangar with upgrades open | still | Replaces the pre-pass-4 hangar. |
| 6 | `screen-lowlevel` and `screen-storm-{440,880}.webp` | M3 low over the snow; M8 thunderstorm with lightning in frame, HUD on | 2 stills | The storm one is an environment test render today. |

Free Run thumbnails (`territory-*.webp`) are the in-game 330 px menu images. A 1320 px still per territory would look sharper, if there is time.

Encode a still: `cwebp -q 80 -resize 880 0 in.png -o screen-NAME-880.webp` and the same with 440.
Encode the hero: `ffmpeg -i in.mov -an -vf scale=540:-2 -c:v libx264 -crf 26 -pix_fmt yuv420p -movflags +faststart hero.mp4`.
