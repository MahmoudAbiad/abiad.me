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
- `data-stats-url` deliberately remains empty until the production Heroku
  deployment has been verified. After enabling `PUBLIC_WEBSITE_STATS_ENABLED`
  on the confirmed production app, verify the exact response and then set it to
  `https://bot.abiad.me/api/public-stats`. The running bot's health endpoint was
  verified, but Heroku CLI credentials and browser login had expired.
- Validation: all 13 pages passed local-link/anchor/JSON-LD/image checks; JS syntax
  passed. An isolated client harness passed 11 success/failure/validation cases.
  The bot aggregate/HTTP suite passed six tests including larger-than-1,000-user
  scans, reduced row limits, no private fields and no per-visitor DB refresh.
