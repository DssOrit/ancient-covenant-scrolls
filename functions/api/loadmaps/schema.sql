-- Load Maps shared hazard layer — Cloudflare D1 schema.
-- One-time setup (keeps everything in this one repo/infra, no third-party service):
--
--   1. Create the database:
--        npx wrangler d1 create loadmaps
--   2. In the Cloudflare Pages project: Settings -> Functions -> D1 bindings,
--      add a binding named  DB  pointing at that database.
--   3. Apply this schema:
--        npx wrangler d1 execute loadmaps --remote --file=functions/api/loadmaps/schema.sql
--
-- Until the DB binding exists, /api/loadmaps/hazards returns { configured:false }
-- and the app stays local-only (your own reports still log on-device).

CREATE TABLE IF NOT EXISTS hazards (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL,
  lat  REAL NOT NULL,
  lng  REAL NOT NULL,
  ts   INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_hazards_ts  ON hazards (ts);
CREATE INDEX IF NOT EXISTS idx_hazards_geo ON hazards (lat, lng);

-- Community cleanliness ratings for restrooms (1-5 stars). `ref` is the
-- OpenStreetMap element ref (e.g. "node/12345") so ratings attach to a specific
-- restroom. Until the DB binding exists, /api/loadmaps/restrooms returns
-- { configured:false } and the app shows OSM badges only (no ratings).
CREATE TABLE IF NOT EXISTS restroom_ratings (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  ref   TEXT NOT NULL,
  lat   REAL NOT NULL,
  lng   REAL NOT NULL,
  stars INTEGER NOT NULL,
  ts    INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_restroom_ref ON restroom_ratings (ref);
CREATE INDEX IF NOT EXISTS idx_restroom_geo ON restroom_ratings (lat, lng);
