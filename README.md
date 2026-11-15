# PGR SSARF agenda

The agenda the PGR representatives prepared for the SEMT student–staff forum planned for 22 October 2026, kept as a record. A buildless, static page. Publish only `dist/`.

Live at https://ssarf.zhouyixiaoxiao.com/ . GitHub Pages publishes `dist/` from the `main` branch via `.github/workflows/pages.yml`.

The page shows the agenda as it stood on 21 October 2026: seven proposed sections, an anonymous thematic summary of feedback received by 19 October, explicitly labelled representative additions, proposed questions and unassigned follow-up roles, and proposals for after the forum. It does not report what was discussed or decided at the meeting. There is a print layout; the slide version of the agenda prepared for the meeting is at `dist/agenda/`, and the calendar file stays at its original path. No backend or raw survey responses.

For a local preview from this directory:

```sh
python3 -m http.server 8765 --directory dist
```

Open `http://localhost:8765`. The page uses system fonts and no remote scripts, tracking, forms or API services. Private correspondence, the chair script and raw student feedback belong outside `dist/`. Publish only anonymised themes without individual quotations, respondent profiles or unverified quantitative claims.

Check before publishing:

- Desktop and 320 px mobile: all agenda items remain readable without horizontal scrolling.
- Keyboard: navigation and native expandable items.
- Print: all seven sections appear in chronological order, with private material absent.

The page asks search engines not to index it. The indexing instruction does not restrict access; this is public material.
