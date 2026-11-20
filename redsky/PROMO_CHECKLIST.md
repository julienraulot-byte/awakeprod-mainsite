# Redsky promo checklist (off-site, for Julien)

Not linked from the site. Served with `X-Robots-Tag: noindex`.

## Before launch day

- [ ] App Store id: once ASC gives it, replace every `href="#appstore"` in `redsky/index.html` and `redsky/fr/index.html`, uncomment the `apple-itunes-app` meta (smart banner) in both heads, add the store URL to `offers.url` and to the Organization `sameAs` in the JSON-LD, and replace "coming soon" in `/llms.txt` and `/redsky/llms.txt`.
- [ ] Social accounts (TikTok, YouTube, X, Instagram, Reddit user): add their URLs to the Organization `sameAs` in the JSON-LD of both pages. There is no `sameAs` today because no account URL was found.
- [ ] Share preview check: paste https://www.awakeprod.fr/redsky/ into the LinkedIn Post Inspector, the Facebook Sharing Debugger (also forces a cache refresh), iMessage and Discord. Expected: 1200x630 image `redsky/media/og.jpg` (`og-fr.jpg` on /fr/).
- [ ] Rich results: run both pages through https://search.google.com/test/rich-results and https://validator.schema.org (VideoGame, FAQPage, VideoObject, BreadcrumbList).

## App Store (ASO)

- Name (30 max): `Redsky: Jet Combat` (18), already set.
- Subtitle (30 max), pick one:
  - `Arcade jet fighter dogfights` (28)
  - `Jet fighter dogfights offline` (29)
  - FR: `Combat aérien arcade` (20) or `Chasseurs, missiles et boss` (27)
- Keywords field (100 max, commas, no spaces, do not repeat words from the name or subtitle):
  - EN: `plane,airplane,dogfight,shooter,pilot,aircraft,missile,boss,offline,arcade,ace,flight,war,airforce`
  - FR: `avion,chasse,aerien,pilote,missile,arcade,hors ligne,boss,tir,guerre,as,escadrille,ailier`
- Promotional text: lead with "Free to start. No ads. Plays offline." It can be changed without a review.
- First three screenshots carry the pitch: the salvo lock, a boss, the hangar. Use the App Preview video (the hero reel recut to 15 to 30 s).
- Category: Games > Action, secondary Games > Arcade.

## Search engines

- [ ] Google Search Console: add the `www.awakeprod.fr` property (DNS TXT through Cloudflare), submit `https://www.awakeprod.fr/sitemap.xml`, then URL Inspection > Request indexing on `/redsky/` and `/redsky/fr/`.
- [ ] Bing Webmaster Tools: import the property from Search Console, submit the sitemap. Bing results feed ChatGPT search and Copilot.
- [ ] Optional: turn on IndexNow in Cloudflare (Caching > Configuration > Crawler Hints) so Bing and Yandex hear about changes.

## Press kit

- Idea: a `/redsky/press/` page with the facts (one paragraph, release date, price model, platform), the icon, the wordmark (PNG with transparency), 6 screenshots, the hero reel and clips to download, a short and a long description, and contact. Many curators and journalists will only cover a game that has one. presskit() / dopresskit format is the usual layout.
- Send it with the App Store link to: TouchArcade (tips form and forums), Pocket Gamer (pocketgamer.com submissions), 148Apps, AppAdvice, Gamezebo, and French sites: Jeuxvideo.com news, iGeneration, Phonandroid.

## Reddit

- Subreddits: r/iosgaming (self-promo allowed on launch with a real post, not a bare link), r/AppHookup (only on a free or discount day), r/indiegaming, r/IndieDev, r/godot (made with Godot: show a technical detail such as the salvo lock or the weather), r/MobileGaming. Skip aviation subreddits: they want real aircraft.
- Post a 15 to 30 s clip recorded on iPhone, with a plain title ("I made an arcade jet combat game for iPhone, solo, in Godot. Free to start, no ads"). Answer every comment in the first two hours. One post per subreddit, read the rules first.

## TikTok, Shorts, Reels

- Vertical 9:16, real in-game footage (the rushes in `redsky/media` and SHOT_LIST.md). Hook in the first second: a four-missile salvo or a boss breaking apart.
- One idea per video: salvo x4, NVG night mission, boss TALUS, the 2 second restart, the hangar build. Text on screen in English, short.
- End card: "Redsky. Free on iPhone." plus the App Store badge alone.
- Post the same clip to TikTok, YouTube Shorts and Instagram Reels; pin the link in the bio to https://www.awakeprod.fr/redsky/.

## Listings and directories

- itch.io: create a page for Redsky (no build needed: link to the App Store) so it shows in itch search and devlogs.
- IndieDB: game profile with screenshots and the trailer; post a release article on launch day.
- Product Hunt: launch on a Tuesday to Thursday, 00:01 PT, with the reel as the first media.
- Game directories that take mobile games: Game Jolt, IGDB (feeds Twitch and many sites; add the game and the company), MobyGames (after release), Metacritic and OpenCritic only after reviews exist.
- Discord: the Godot Engine server's showcase channel; mobile gaming servers' self-promo channels.
- Hacker News "Show HN" works for a solo dev story with a technical angle (Godot on iPhone, performance), not for the game alone.
