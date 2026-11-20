# Redsky site: media

All media lives in `redsky/media/`. Record on the iPhone, portrait, final build, no debug overlay.
The page shows every screen inside a CSS iPhone, so record the full screen with nothing composed around it.
`/redsky/media/*` is cached for a year: give a replaced file a new name and update both `index.html` and `fr/index.html`.

## In place (Julien's rushes, 2026-11-20)

| File | Rush | Shows | Used in |
|---|---|---|---|
| `hero-reel.mp4/.jpg` | all six, cut together (17 s) | best of the six below | hero |
| `clip-snow` | 11-26-03 | snow valley, gun kills, GUN LEVEL 2 | Flight |
| `clip-alpine` | 12.MOV | M1 alpine valley, Raven radio, salvo x2, river | Shot on iPhone |
| `clip-canyon` | 11-22-24 | Desert Canyon, salvo x2, WINGMEN IN | Shot on iPhone |
| `clip-escort` | 11-19-46 | above the clouds, Break the escort, afterburner climb | Shot on iPhone |
| `clip-nvg` | 11-23-40 | night vision, Sink the destroyers | Weather |
| `clip-karst` | 11-24-51 | Karst Bay at dusk, rockets on a harbour ship | Weather |

Clips: 540 px wide, H.264 CRF 30 (hero 31), 30 fps, silent, poster = first frame.
`ffmpeg -i in.mov -an -vf "fps=30,scale=540:-2" -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart clip-NAME.mp4`
then `ffmpeg -i clip-NAME.mp4 -frames:v 1 -q:v 5 clip-NAME.jpg`.

## Still missing

| # | Moment | Replaces |
|---|---|---|
| 1 | MSL held, four red lock boxes, the salvo x4 leaving (the rushes only reach x2) | the SVG lock demo could sit next to it |
| 2 | EMP firing: the pulse clearing the sky (the key is visible, the effect never is) | new clip for the EMP line |
| 3 | A boss fight (TALUS on the glacier is the free one) | campaign section has no boss footage |
| 4 | Mission 3 briefing, map tab, current build | `screen-briefing-*.webp` (old) |
| 5 | Hangar with upgrades open, current build | `screen-hangar-*.webp` (pre-pass-4) |
| 6 | M8 thunderstorm with lightning in frame | "Moonlight, then lightning" has no picture |
| 7 | 1200x630 share image (wordmark + phone) | `og:image` uses the reel poster |

Free Run thumbnails (`territory-*.webp`) are the in-game 330 px menu images; a 1320 px still per territory would be sharper.
