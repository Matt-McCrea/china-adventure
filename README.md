# China Adventure 2026: route map

Interactive map of a 26-day rail journey across China (Chongqing → Guizhou → Chengdu → Kashgar → Silk Road → Xi'an, 2–27 Oct 2026).

**Status:** map stage, for approval. The full website (timeline, chapters, field notes) builds on this code next.

```
app/                      Vite + React + TypeScript
  src/data/itinerary.ts   ← THE FILE YOU EDIT: stops, dates, trains, copy, coordinates
  src/data/types.ts       data model (Stop, Waypoint, RouteSegment)
  src/data/generated/     build output: basemap + route geometry (don't edit by hand)
  src/map/                renderer: projection, basemap, routes, label engine
  scripts/                build-basemap.ts, build-routes.ts
scripts/fetch-rail.sh     downloads OSM railway relations
```

## Run it

```bash
cd app
npm install
npm run dev            # local dev server
npm run build          # static site in dist/
npm run build:single   # one self-contained HTML file in dist-single/
```

Deep links: `#chengdu` (or any stop id) opens that stop; `#poster` opens poster view; `#world` opens the world view.

The world view (`src/components/WorldView.tsx`, Equal Earth) is separate from the China map, whose Albers projection can't show the whole globe. Its countries come from `npx tsx app/scripts/build-world.ts` → `generated/world.topo.json`.

## Updating the itinerary

Everything lives in `app/src/data/itinerary.ts`.

| Change | What to edit | Rebuild routes? |
|---|---|---|
| Dates, highlights, kicker, copy | `STOPS[]` | no |
| A confirmed train number | `SEGMENTS[].service`, and set `serviceStatus: "confirmed"` | no |
| Move a stop / fix a coordinate | `longitude`, `latitude`, `confidence`, `coordSource` | yes, if a segment starts or ends there |
| Add or remove a stop | `STOPS[]` (renumber `number`) + the `SEGMENTS[]` that lead into it (`leg` = stop id) | yes |
| Change how a leg is drawn | `SEGMENTS[].mode`: `rail` / `local` / `schematic` | yes |

Rules the data follows:

- **No invented facts.** Anything unconfirmed has `serviceStatus: "tbc"` (shows a TBC tag). Only put a train number in `service` if it's real; T270 is currently marked TBC.
- **Coordinates carry their confidence.** `verified` means taken from an OSM node or station. `approximate` shows "approx." on the map, a dashed uncertainty ring when zoomed in, and the reason in the card.
- **`leg`** ties a segment to the stop it arrives at. That drives segment highlighting, the "Getting there" section of each card, and the Play Journey order (segments play in array order).

### Regenerating route geometry

```bash
cd app
npm run build:routes
```

- `rail` segments follow the shortest path along the OSM railway relations in `osmLines` (see `LINES`). New relation ids need downloading first: `../scripts/fetch-rail.sh <id> …`. Find relation ids on openstreetmap.org (search the line name, e.g. 兰新线).
- `local` segments use the public OSRM demo router (road alignment, approximate).
- `schematic` segments have no geometry. They're drawn as a dotted arc (`bend` sets the curve) and always labelled "schematic".

The script prints each leg's measured length next to the straight-line distance, which is a quick sanity check. Gaps under 3 km in OSM relations are bridged automatically.

### Known data gaps (OSM, Sept 2026)

- Tiexi Valley isn't mapped in OSM. It's placed about 4 km north of Zhenyuan town (Baidu Baike / Ctrip) and marked approximate.
- Taipan: OSM has the township centre, not the 村BA court. Marked approximate.
- T60 (Chengdu → Kashgar) is drawn as an arc by choice, but its real track is still traced hop by hop (`osmRoute`) for the distance: 3,909 km vs 3,941 km published. Two small OSM gaps (under 8 km) are bridged. To draw the real line, see the comment on that segment in itinerary.ts.
- The Lanzhou–Xinjiang line relation passes about 8 km from Hami station, so the rail line ends slightly short of the Hami marker at close zoom.

## Base map

Built from open data, so there is no tile provider or API key:

- Natural Earth 1:10m (countries, provinces, rivers, lakes) and 1:50m grey shaded relief (public domain)
- Albers equal-area conic, standard parallels 25°N / 47°N, central meridian 105°E (the usual national projection for China; areas stay true)

`npm run build:basemap` regenerates it. It expects the Natural Earth downloads in `scripts/.cache/` (see the header of `app/scripts/build-basemap.ts`). To switch data sources, change that script. The renderer only reads `generated/basemap.topo.json` and `assets/relief.jpg`.

Attribution shown on the map: Natural Earth · © OpenStreetMap contributors (ODbL) · OSRM.
