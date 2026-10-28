# Contact and secure statistics — 2026-10-28

- Removed the developer's GitHub profile link from the homepage, Person JSON-LD,
  llms.txt and the unused analytics event handler.
- Updated the homepage, privacy and terms contact address to mahmoud@abiad.me.
  This changes the displayed address only; it does not provision an email inbox.
- Added a validated aggregate client: anonymous, credential-free GET, JSON only,
  safe integer counts, UTC refresh timestamp validation and a one-day maximum age.
  Failed, malformed, stale or future-dated data leaves the explicitly dated
  historical fallback intact; failures are never displayed as zero.
- Shared JavaScript cache version is now 11 on all pages.
- The matching bot change is in MahmoudAbiad/abiadquizbot PR #18. It uses an
  opt-in in-memory snapshot refreshed every 15 minutes and exposes only two
  counters and their timestamp. No new DB credential, grant or schema change.
- Activated after verifying the production Heroku app `abiad-quiz-maker-bot`
  serves `https://bot.abiad.me` and contains the merged bot change. Enabled
  `PUBLIC_WEBSITE_STATS_ENABLED=true` on that app through its existing dashboard
  session. No other config var was edited and no secret value was copied.
- Verified the endpoint returns HTTP 200 and exactly 646 registered accounts,
  16,775 questions in the existing bot counter, and UTC timestamp
  `2026-10-28T05:18:41.645916+00:00`. Pointed `data-stats-url` at
  `https://bot.abiad.me/api/public-stats` and replaced the dated HTML fallback
  with that verified snapshot (08:18 Damascus). The counts are not an independent
  audit of successful unique questions; they use the existing bot counter.
- Live boundary checks: exact allowed-origin CORS header, no CORS header for an
  unrelated origin, refresh/filter query rejected with 400, POST rejected with
  405. `/health` remained 200 with the bot running. Public aggregate JSON is
  intentionally readable without authentication; no row-level access was added.
- Validation: all 13 pages passed local-link/anchor/JSON-LD/image checks; JS syntax
  passed. An isolated client harness passed 11 success/failure/validation cases.
  The bot aggregate/HTTP suite passed six tests including larger-than-1,000-user
  scans, reduced row limits, no private fields and no per-visitor DB refresh.
