# AGENTS.md

Practice audio player for choir singers learning Bach's Johannespassion BWV 245 by voice part (S/A/T/B).
Deployed on GitHub Pages. No build step — open `index.html` directly in a browser.

## Key conventions

- Chorale numbers follow the **BG edition** (Bach-Gesellschaft), not the NBA (Neue Bach-Ausgabe).
- Audio files: `audio/nr{NUMBER}-{PART}.m4a`
- Lyrics texts live in `lyrics.js` as a plain JS object keyed by BG number; `index.html` injects them at runtime.
- To add a chorale: add M4A files + a `<tr data-nr="NR">` row in `index.html`; add the text to `lyrics.js`.

## Non-obvious behaviour

- Only one player plays at a time — others are paused on `play`.
- The lyrics row for the active chorale shows on `play` and stays visible on pause; it hides only when a different chorale starts.
- Mobile layout: table switches to block/flex at 768px; `<thead>` is hidden and `::before` pseudo-elements label each row instead.
