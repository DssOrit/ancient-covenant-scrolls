-- ===========================================================================
-- OCC — Operations Command Center : Cloudflare D1 database schema
-- Run this once against your D1 database (see HANDOFF_OCC_BACKEND.md).
-- Safe to re-run: every table uses IF NOT EXISTS.
-- ===========================================================================

CREATE TABLE IF NOT EXISTS users (
  id         TEXT PRIMARY KEY,
  name       TEXT UNIQUE NOT NULL,
  role       TEXT NOT NULL,            -- 'owner' | 'employee'
  title      TEXT,
  pass_hash  TEXT NOT NULL,            -- PBKDF2-HMAC-SHA256, base64
  pass_salt  TEXT NOT NULL,            -- base64
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS assignments (
  id             TEXT PRIMARY KEY,
  title          TEXT, site TEXT, worker TEXT, week INTEGER,
  pay            REAL, bonus REAL, goal TEXT, status TEXT,
  submitted_date TEXT, approved_date TEXT, paid_date TEXT, owner_notes TEXT,
  invoice_submitted INTEGER DEFAULT 0, invoice_submitted_date TEXT,
  kind TEXT, scope TEXT   -- daily model: kind 'verify' | 'recert'; scope optional
);

CREATE TABLE IF NOT EXISTS checklist (
  id            TEXT PRIMARY KEY,
  assignment_id TEXT, day INTEGER, idx INTEGER, label TEXT, done INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS issues (
  id        TEXT PRIMARY KEY,
  title TEXT, site TEXT, page TEXT, browser TEXT, device TEXT,
  steps TEXT, expected TEXT, actual TEXT, severity TEXT, status TEXT,
  shot TEXT, notes TEXT, assignment TEXT, created_by TEXT, created_at TEXT
);

CREATE TABLE IF NOT EXISTS evidence (
  id        TEXT PRIMARY KEY,
  shot TEXT, video TEXT, issue TEXT, browser TEXT, device TEXT,
  notes TEXT, r2_key TEXT, size INTEGER DEFAULT 0, created_by TEXT, created_at TEXT
);

-- Uploaded screenshots are stored here as small downscaled images
-- (base64), so no R2/object store or payment method is needed. Rows are
-- auto-deleted 48h after upload; evidence.r2_key holds the matching id.
CREATE TABLE IF NOT EXISTS evidence_blobs (
  id          TEXT PRIMARY KEY,
  data        TEXT,
  content_type TEXT,
  size        INTEGER DEFAULT 0,
  created_at  TEXT
);

CREATE TABLE IF NOT EXISTS messages (
  id        TEXT PRIMARY KEY,
  sender TEXT, sender_role TEXT, recipient TEXT, priority TEXT,
  assignment TEXT, body TEXT, created_at TEXT
);

CREATE TABLE IF NOT EXISTS alerts (
  id        TEXT PRIMARY KEY,
  what TEXT, site TEXT, browser TEXT, device TEXT, urgency TEXT,
  shot TEXT, notes TEXT, created_by TEXT, created_at TEXT
);

-- Section-by-section verification (the core proof-of-work table)
CREATE TABLE IF NOT EXISTS sections (
  id         TEXT PRIMARY KEY,
  site TEXT, name TEXT, status TEXT DEFAULT 'Untested',
  evidence TEXT, notes TEXT, owner_ok INTEGER DEFAULT 0,
  verified_at TEXT, updated_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_sections_site    ON sections(site);
CREATE INDEX IF NOT EXISTS idx_issues_created   ON issues(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
