# Historical checks — five-page version

These results describe the earlier version and do not validate the new single-page design.

# Portfolio checks

Date: October 29, 2026 (America/New_York).

Scope: local source files. All-page tests mean `index.html`, `about.html`, `projects.html`, `skills.html`, and `contact.html`.

No browser was exposed to the automation tools in this session. Source checks and JavaScript execution with a simulated DOM were available. A simulated result does not verify browser rendering, native keyboard/touch behavior, or browser storage policy. Not run cases remain open.

## Executed checks

| ID | What is tested | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| S01 | Every navigation target on every page | Extract each page’s navigation; check all five links and their file targets (25 combinations). | All five targets exist on every page. | Pass — source inspection. |
| S02 | Internal links, fragments, CSS, scripts, and images | Resolve every relative `href`/`src`; check referenced IDs. | Every local target exists; all fragments resolve. | Pass — all five pages. |
| S03 | Page structure | Check language, viewport, title, one h1, main, skip link, and current navigation marker. | Each page has the expected structure. | Pass — source inspection on all five pages. |
| S04 | Image accessibility and sizes | Inspect every image’s alt attribute and local file size. | Informative alt text; images under 500 KB. | Pass — four photos are 186–287 KB; QR is 561 bytes. |
| S05 | Shared assets and local compatibility | Inspect all pages for relative paths, shared stylesheet, deferred shared script, and no inline styles. Inspect JS for server dependencies. | Same assets on all pages; no content fetch or build step. | Pass — source inspection. Actual local browser use remains M01. |
| S06 | JavaScript parsing | Parse `js/script.js` using Node’s VM. | No syntax error. | Pass. |
| S07 | Mobile navigation logic | Run shared JS with simulated small-screen DOM; activate Menu, Escape, outside click, and breakpoint changes. | Menu state and `hidden` match the breakpoint; Escape returns focus. | Pass — simulated execution, repeated for each page. |
| S08 | All five color options on every page | Simulate selecting White, Beige, Blue-gray, Purple, and Black; inspect theme and pressed states. | Exactly one option selected; dropdown closes and focus returns. | Pass — 25 simulated selections. |
| S09 | Persistence and invalid saved values | Re-run JS with each saved color and with an invalid value. | Saved valid theme restored; invalid value defaults to white. | Pass — simulated storage; browser behavior remains M05. |
| S10 | Unavailable storage | Make storage reads/writes throw; select Purple. | Page loads with White; selection still changes current page. | Pass — simulated execution for all five pages. |
| S11 | Color-dropdown logic | Simulate hover, pointer exit, click, focus within/away, outside click, and Escape. | Opens/closes correctly; stays open with focus inside; expanded state and Escape focus are correct. | Pass — simulated execution. Physical input remains M04. |
| S12 | Text and link contrast | Calculate sRGB contrast for text, muted text, and accent links against background/surface and button text against button fill in every theme. | At least 4.5:1 for normal text. | Fail initially — Blue-gray muted text was 4.21:1. Fixed and retested: 4.68:1. All other checked pairs pass. |
| S13 | Focus color contrast | Calculate focus color contrast against each theme’s background and surface. | At least 3:1. | Pass — minimum 5.02:1. Visual focus review remains M06. |
| S14 | Approved contact and game destination | Inspect mailto, game anchors, and QR generation destination. | Email is `andrewsoliman12@gmail.com`; game is `https://andrewpyc.github.io/Clicker-game-/`. | Pass — source/destination inspection; scanning remains M09. |

## Content follow-up checks — October 29, 2026

| ID | What is tested | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| S15 | Suggested house/circuitry content | Inspect updated cards for explicitly suggested goals and typical-tool labels; check heading count and resolve local links across all five pages again. | Two suggested goals and two typical-tool labels; one h1 on Projects; no broken local targets. | Pass — source inspection. Browser layout remains untested. |

## Browser and live acceptance checks

| ID | What is tested | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| M01 | Direct local opening | Double-click `index.html`; visit all five pages and open the photo links. | Pages, styles, scripts, and images load without a server. | Not run. |
| M02 | All navigation in Live Preview | Open with VS Code Live Preview. On each of five pages, click every navigation link, then test the skip link and project anchors. | All 25 navigation combinations reach the correct pages; anchors work. | Not run. |
| M03 | Phone and laptop layouts | View every page at 320px, 390px, and 1366px widths; scroll the entire page. | Readable text, flexible images, usable controls, no horizontal overflow. | Not run. |
| M04 | Dropdown with real input | On each page, hover the Color button; move into options; click and select. Repeat with keyboard Enter/Space, Tab, Shift+Tab, Escape, and on a touchscreen. | Usable with all input methods; hidden options are outside tab order; selected state is exposed; Escape returns focus. | Not run. |
| M05 | All colors and actual persistence | On every page select each of the five themes. Navigate to every other page and reload. Repeat in Live Preview/Pages with storage blocked. | Every option changes the overall page, persists with available storage, and works on the current page without storage. | Not run. Direct `file:` storage behavior depends on browser. |
| M06 | Keyboard on every page | Tab from the address bar through skip link, navigation, Color, content, email/download links, and footer. Use Enter/Space and Escape. | Logical order and visible focus; no hidden menu or dropdown items receive focus. | Not run. |
| M07 | Mobile navigation | At a phone width on each page, use mouse, keyboard, and touch to open/close Menu; press Escape inside it; resize to laptop and back. | Expanded state follows visibility; collapsed links are not tabbable; desktop links stay visible. | Not run. |
| M08 | Appearance and accessibility in every theme | Inspect all five pages in all five themes, including hover/focus, surfaces, dropdowns, image captions, and 200% zoom. Enable reduced motion. | Readable content and controls, visible focus, no clipped content; no required motion. | Not run. |
| M09 | Game and QR | Open Play link; download QR; scan saved QR with a phone. | The game opens at the exact supplied URL from both link and QR. | Not run. QR image was visually inspected, not decoded. |
| M10 | Email link | On Contact, activate email link with keyboard and mouse. | Email app opens a message addressed to the approved email. No sending is claimed. | Not run. |
| M11 | Lighthouse — Home | Audit `index.html` in Live Preview and on the live site. | Accessibility score ≥90. | Not run — no score recorded. |
| M12 | Lighthouse — About | Audit `about.html`. | Accessibility score ≥90. | Not run — no score recorded. |
| M13 | Lighthouse — Projects | Audit `projects.html`. | Accessibility score ≥90. | Not run — no score recorded. |
| M14 | Lighthouse — Skills | Audit `skills.html`. | Accessibility score ≥90. | Not run — no score recorded. |
| M15 | Lighthouse — Contact | Audit `contact.html`. | Accessibility score ≥90. | Not run — no score recorded. |
| M16 | GitHub Pages final acceptance | After approved deployment, repeat navigation, images, game/QR, email, all themes/persistence, keyboard, and phone/laptop checks at the actual published URL. Record URL/date and failures/retests below. | All acceptance checks pass under `/portfolio/`. | Not run — no deployment performed. |

## Live acceptance log

No live URL was tested in this task. Intended destination: `https://andrewpyc.github.io/portfolio/` based on the verified Git remote. Add the actual tested URL and date after deployment; preserve failures and add separate retest results.

## Content review still needed

The house-design and circuitry-design entries now include suggested goals and typical tools at Andrew’s request. Their actual scope and tool use still need confirmation, and actual images/screenshots are needed before the assignment’s per-project image requirement is complete.
