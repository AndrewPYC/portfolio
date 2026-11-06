# Single-page portfolio checks

## Pre-commit checks — November 5, 2026

| ID | What is tested | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| C01 | Source integrity | Check all five HTML files for one h1, unique IDs, existing local references and fragments; parse main/vendor JS with Node VM; count CSS braces; inspect the exact LinkedIn URL and removed contact content. | Valid local targets, parseable JS, balanced CSS braces, approved contact link only. | Pass — 5 HTML pages and 94 local references checked; both scripts parsed; all remaining source assertions passed. |
| C02 | Sensitive files | Inventory non-Git project files; scan first-party text for private-key blocks and common credential patterns. | Only project source, assets, documentation, and licensed vendor files; no detected credential patterns. | Pass — file inventory and pattern scan executed. This is not a complete security audit. |
| C03 | Rendered acceptance | Review WebGL, both themes, mobile layout, keyboard controls, motion preferences, and Lighthouse in a browser. | Readable, functional, accessible page with adaptive 3D rendering. | Not run — browser automation stopped because it could not reliably determine the current browser URL. No WebGL or FPS verification claimed. |

## Contact update — November 5, 2026

| ID | What is tested | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| L01 | Public email removal | Inspect index.html for the email, mailto link, and email-app prompt; check the contact ID and GitHub link. | Email content removed; contact navigation and repository link retained. | Pass — executed PowerShell source checks. |
| L02 | LinkedIn replacement | Add Andrew’s supplied profile URL, then activate the button with mouse and keyboard in both themes at phone/laptop widths. | Styled, readable button opens the exact supplied profile. | Not run — awaiting Andrew’s LinkedIn URL; no guessed destination added. |
| L03 | Supplied LinkedIn URL follow-up | After Andrew supplies his profile URL, inspect the Contact button, exact href, email removal, contact anchors, GitHub link, and reused CSS rules. | One “Connect on LinkedIn” button links to https://www.linkedin.com/in/andrew-soliman-477185449/; email absent; existing navigation/repository link, wrapping actions, 48px button height, and visible focus rules retained. | Pass — executed PowerShell source checks after adding the supplied URL. Supersedes L02’s missing-URL status. |
| L04 | LinkedIn rendered review | Refresh index.html; go to Contact at phone/laptop widths in both themes; Tab to “Connect on LinkedIn” and press Enter, then test clicking. | Button fits, focus is visible, and both activation methods open Andrew’s profile. | Not run — manual browser verification remains pending; source checks do not verify rendering or LinkedIn availability. |
| L05 | Requested GitHub link removal | Inspect index.html for the GitHub portfolio label/URL, exact LinkedIn button destination, and contact navigation. | GitHub portfolio link absent; LinkedIn button and contact navigation retained. | Pass — executed PowerShell source checks. Supersedes earlier expectations that the contact section include GitHub. |

The contact update remains local. Earlier results below are historical and do not establish browser verification of this update.

Date: October 29, 2026 (America/New_York).

These results apply to the single-page black/orange scrollytelling redesign. Earlier five-page results, including the original contrast failure and fix, are preserved in [TESTING_HISTORY.md](TESTING_HISTORY.md).

The available browser inventory returned no apps or browsers. Executed checks used source inspection and Node’s VM with a simulated DOM. These do not establish rendered layout, native interaction, or Lighthouse results.

## Executed checks

| ID | What is tested | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| S01 | One-page structure | List root HTML files; inspect navigation and heading structure. | Only index.html remains; navigation uses section anchors; one h1 and unique IDs. | Pass — source inspection. |
| S02 | Links and story assets | Resolve every local href, src, fragment, and data-image path. | No broken targets; all four model views are available. | Pass. |
| S03 | Accessibility foundations | Inspect image alt attributes, skip link, headings, button labels, semantic landmarks, shared CSS, and deferred script. | Required markup exists; no inline styles or content fetch. | Pass — source inspection; browser accessibility remains M09. |
| S04 | Script syntax | Parse the current script with Node’s VM. | No syntax error. | Pass. |
| S05 | Dark and light themes | Execute script, toggle both ways, restore saved light mode, and test an invalid stored value. | Black/orange defaults; both modes work; button names the next mode; invalid data defaults to dark. | Pass — simulated DOM/storage. |
| S06 | Blocked storage | Simulate throwing storage reads/writes, then activate theme button. | Dark default; button still switches the current page to light. | Pass — simulated execution. |
| S07 | Mobile menu and focus | Simulate open, chapter selection, Escape, outside click, and crossing the phone breakpoint both ways. | Expanded state and visibility agree; selection moves focus to destination; Escape returns to Menu; desktop navigation visible. | Pass — simulated execution. |
| S08 | Four model scenes | Simulate step positions in order 1, 2, 3, 4, 3, 2, 1. | Image, alt, full-size link, caption, counter, and active step match the narrative in both directions. | Pass — all four views, simulated geometry. |
| S09 | Current chapter | Simulate all seven tracked section positions. | One navigation link marked current; project, exploration, and software sections share Projects. | Pass — simulated geometry. |
| S10 | Reading progress | Simulate top, midpoint, end, negative scroll, and zero scrollable distance. | Progress is 0%, 50%, 100%, clamped to zero, and safe for a short document. | Pass — simulated geometry. |
| S11 | Scroll scheduling | Dispatch ten scroll events before a simulated animation frame. | Only one pending frame update. | Pass. |
| S12 | Text contrast | Calculate text, muted text, and links against page/surface colors, plus CTA text against its fill. | All pairs at least 4.5:1. | Pass — minimum dark 8.02:1; light 5.27:1. |
| S13 | Focus contrast | Calculate focus color against both backgrounds in each mode. | At least 3:1. | Pass — minimum 9.47:1. |
| S14 | Content and destinations | Inspect email, game URL, suggested-goal/tool labels, and four model-image descriptions. | Approved destinations retained; proposed work not presented as completed results. | Pass — source inspection. |

Button-label update, October 29, 2026: source inspection confirmed the game button reads “Clicker Co” and retains the supplied game URL. Pass. Reload the browser to review the new label; no browser check was run for this text-only change.

## Browser and live review

| ID | What is tested | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| M01 | Local opening and no-JS use | Double-click index.html; disable JavaScript and reload; follow every model-image link and chapter link. | Story and all images/links accessible; no server dependency; no empty sections or hidden narrative text. | Not run. |
| M02 | All navigation and anchors | Open VS Code Live Preview. Use all header, scroll, next-chapter, contact, and back-to-top links; reload a deep chapter hash. | Correct destination; heading visible below sticky header; scene updates to current position. | Not run. |
| M03 | Phone and laptop layouts | Review the entire page at 320px, 390px, 768px, and 1366px widths, including a 1366×600 short window. | No horizontal overflow or clipped text; short-window static layout is readable. | Not run. |
| M04 | Actual scrollytelling | On laptop and phone, slowly scroll every design step forward and backward; jump past the section and return; resize mid-story. | Sticky image and captions follow the correct step; text remains readable; sticky media does not obscure focused links. | Not run. |
| M05 | Theme and persistence | Toggle with mouse, touch, Enter, and Space; reload in both modes; repeat with blocked storage. | Correct colors and button action; preference survives available storage; current-page toggle works when blocked. | Not run. |
| M06 | Mobile navigation | At phone width, open Menu; select each chapter, close with button/Escape/outside click, then resize. | Hidden links not tabbable; chapter focus moves correctly; navigation and expanded state remain consistent. | Not run. |
| M07 | Full keyboard route | Tab through skip link, controls, anchors, all image links, game, download, email, and footer. | Logical order, visible focus, no traps; focus never hidden by sticky elements. | Not run. |
| M08 | Reduced motion and zoom | Enable reduced motion; reload and scroll; test 200% and 400% zoom plus short and landscape windows. | Static layout with full content, no smooth scrolling when reduced motion is requested, no inaccessible text. | Not run. |
| M09 | Lighthouse Accessibility | Audit index.html in Live Preview and after deployment; record actual score and issues. | Score ≥90. | Not run — no score recorded. |
| M10 | Game, QR, and email | Open game, download and scan QR, activate email. | Exact supplied game opens; email app addresses andrewsoliman12@gmail.com; no message is sent automatically. | Not run. |
| M11 | Visual themes and image loading | Review all sections, hover/focus states, model swaps, captions, and QR in both modes, including slow image loading. | Readable orange text, suitable light-mode contrast, intact images, no jumpy or hidden content. | Not run. |
| M12 | Live Pages acceptance | After approved deployment, repeat navigation, assets, themes, model scenes, keyboard, QR/email, and responsive checks under /portfolio/. | All acceptance checks pass; tested URL/date recorded. | Not run — no deployment performed. |

## Live acceptance log

No live URL was tested in this task. Intended destination: `https://andrewpyc.github.io/portfolio/`, based on the verified Git remote. Preserve failures and add separate fixes/retest results after actual testing.

## Content review

The current featured projects are the crutch holder and Clicker Co. Andrew requested removing house/circuitry content on November 3, 2026; earlier test entries below describe the prior page. The crutch-holder narrative describes supplied model details and possible development questions without claiming testing or completed outcomes.

## Motion-study mockups — October 29, 2026

Scope: `mockups/index.html`, `mockups/kinetic.html`, `mockups/blueprint.html`, and `mockups/orbital.html`, with namespaced CSS and a separate controller branch in the shared script. The computer-use inventory again returned no apps or browsers. No browser screenshots, rendered layout checks, or live acceptance results are claimed. JavaScript checks below used Node VM and simulated DOM/media/storage objects, not a browser.

| ID | What is tested | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| A01 | All local links and assets | Resolve each href/src and local fragment on all four mockup pages. | Every local destination exists. | Pass — 62 references resolved. |
| A02 | Page structure | Inspect each page's IDs, h1, deferred script, and styles. | Unique IDs, one h1 per page, shared external CSS/JS, no inline source styles. | Pass — source check. |
| A03 | Script syntax | Parse the complete shared script using Node VM. | No syntax errors. | Pass. |
| A04 | Controller isolation | Initialize mockups and the original portfolio with matching simulated DOMs. | Each initializes its own controls without accessing the other layout's elements. | Pass — all four mockups and original initialized. |
| A05 | Theme switching | Click theme control twice in every mockup simulation. | Dark/light modes and action labels update. | Pass — simulated controls. |
| A06 | Storage behavior | Initialize with saved light mode, an invalid value, and throwing storage; toggle theme. | Saved light restored; invalid defaults dark; blocked storage still permits toggling. | Pass — simulated storage. |
| A07 | Motion pause | Pause and resume every concept and gallery. | Paused class and button state agree; active motion resumes on request. | Pass — simulated state. Actual animation playback still requires browser review. |
| A08 | Reduced motion | Initialize with reduce enabled; change media preference at runtime. | Motion paused, button disabled/labeled Reduced motion, scroll shifts zero; control restored when preference changes. | Pass — simulated media query. CSS animation disable rules inspected. |
| A09 | Model selection both ways | Select views 2, 3, 4, 3, 2, 1 in all three concepts. | Image path, alt, full-size link, caption, counter, and exactly one pressed button agree. | Pass — simulated controls. |
| A10 | Scroll effects | Dispatch ten scroll events before a frame; scroll past the maximum; pause. | One scheduled frame, headline shift at most 70px, model shift bounded to ±22px; pause resets both. | Pass — simulated frame/geometry. |
| A11 | Perspective interaction | Move pointer to model edge, leave, pause, and repeat with touch media query. | Tilt bounded to ±4 degrees; leaving resets; pause and touch suppress tilt. | Pass — simulated pointer events. |
| A12 | Main portfolio regression | Initialize original controller; switch theme; inspect desktop menu and progress. | Existing default theme, theme action, navigation visibility, and initial progress work. | Pass — simulated DOM. Full browser regression not run. |
| A13 | Text palette contrast | Calculate text/muted/control contrast in both themes. | Checked text pairs meet 4.5:1. | Pass — checked pairs 6.13:1 or higher. Inherited focus palette unchanged; rendering not audited. |
| A14 | No-JS fallback | Inspect static content, noscript image links, hidden JS controls, and animation selectors. | Content and image links remain; automatic loops require motion-ready class added by JS. | Pass — source inspection only. Browser-disabled-JS check not run. |
| A15 | Laptop/phone visual review | Open gallery in Live Preview; inspect all four pages at 320, 390, 768, and 1366px plus a 600px-high window in both themes. | Distinct concepts; readable content; no clipped text or horizontal scroll. | Not run — browser unavailable. |
| A16 | Keyboard/touch and native scrolling | Tab through each page; use Enter/Space on controls; follow all links; repeat view/theme controls on touch; scroll naturally. | Visible focus, usable controls, accessible chapter destinations, all four images available. | Not run — browser unavailable. |
| A17 | Native animation/accessibility | Verify pause/resume and OS reduced motion; disable JS; run Lighthouse Accessibility. | Motion stops on request; reduced motion stays static; content remains; accessibility score at least 90. | Not run — no Lighthouse score or browser animation result. |
| A18 | Deployment acceptance | After a chosen direction is implemented and deployment authorized, test the live site under /portfolio/. | Assets, navigation, themes, motion, and responsive layout work at recorded URL/date. | Not run — these are local choice mockups; no deployment. |

Review: open `mockups/index.html`, explore each concept, scroll to its project, try all four view buttons, switch themes, and pause/resume. Use the top direction links to compare and AS. to return to the gallery. The original portfolio remains at `index.html`.

## Integrated Blueprint + Orbital portfolio — October 29, 2026

Andrew requested combining directions 2 and 3 into the main `index.html`. Checks below supersede the earlier plain-hero baseline for the changed elements. The browser inventory returned no connected apps or browsers; rendered checks remain unexecuted. The earlier failed checks and history above are retained.

| ID | What is tested | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| B01 | Main page structure/assets | Parse index.html; check h1, IDs, external CSS/JS, relative links and data-image assets. | One h1, unique IDs, all eight sections and all local references resolve. | Pass — 25 local references checked. |
| B02 | Shared source syntax | Parse script with Node VM; inspect CSS braces. | Valid JS, balanced stylesheet. | Pass — syntax/structure checks. |
| B03 | Motion startup/control | Initialize integrated controller; pause and resume. | Ready class added after button setup; pressed state/label match paused state. | Pass — simulated DOM. |
| B04 | Pause persistence | Pause and inspect stored preference; initialize with saved pause. | Saved pause restored on reload. | Pass — simulated storage. |
| B05 | Reduced-motion priority | Initialize reduced; change preference to no-preference. | Motion paused, control disabled and labeled Reduced motion; control restored on preference change. | Pass — simulated media query. CSS overrides inspected. |
| B06 | Storage denied | Throw on storage reads/writes; toggle motion and theme. | Both current-page controls still work. | Pass — simulated DOM/storage. |
| B07 | Model perspective | Move pointer to corners, leave, then pause; repeat with coarse/touch media. | Tilt limited to ±3 degrees, resets on leave/pause, suppressed for touch. | Pass — simulated pointer events. |
| B08 | Existing model scroll | Simulate all four steps forward and backward. | Correct source and full-size image link for each step. | Pass — simulated geometry. |
| B09 | Reading progress | Simulate halfway down a 5000px document with a 900px viewport. | Progress reports 50%. | Pass — simulated geometry. |
| B10 | Mobile menu/focus | Simulate phone breakpoint, open menu and select My story. | Menu closes and focus moves to the chapter. | Pass — simulated controls. |
| B11 | Theme regression | Initialize saved light mode and toggle dark. | Correct theme restored and switched. | Pass — simulated controls. New visible text uses the existing tested theme tokens. |
| B12 | No-JS fallback | Inspect content, model links, hidden controls, and portfolio-motion-ready selectors. | Static decoration and full narrative remain without JS; automatic loops require the initialized control. | Pass — source inspection; browser-disabled-JS test not run. |
| B13 | Responsive visual review | Open main index.html at 320/390/768/1366px, short windows, 200/400% zoom, and both themes. | Header fits, hero reflows, model and text stay visible; no horizontal scrolling. | Not run — browser unavailable. |
| B14 | Actual animation/input | Scroll all chapters; pause/resume; reload paused; move pointer over model; use keyboard and touch. | Smooth natural reading, working controls and visible focus; paused preference survives. | Not run — browser unavailable. |
| B15 | Accessibility/live acceptance | Run Lighthouse and reduced-motion/no-JS browser review; after authorized deployment repeat on Pages. | Accessibility ≥90 and correct deployed behavior with recorded URL/date. | Not run — no browser audit or deployment. |

Review the main `index.html`, not a mockup. The opening combines the blueprint grid and orbital assembly. Scroll to the crutch-holder model to see the scanning guide and try pointer tilt. Pause motion in the header and switch to light mode to compare.

## Opening overview — October 29, 2026

| ID | What is tested | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| O01 | Overview structure and chapter links | Inspect the opening aside, its heading, and its five anchor targets; check IDs, h1 count, and CSS brace balance. | Overview in the opening's right column, five valid chapter links, unique IDs, one h1, retained orbital decoration, valid brace structure. | Pass — source checks. No JavaScript changes. |
| O02 | Overview responsive/keyboard review | Refresh main index.html; review at laptop and 320/390px widths, both themes, and with Tab/Enter. | Overview appears on the right on laptops, stacks on phones, has readable summaries and visible focus, and every link reaches its chapter. | Not run — rendered browser and physical keyboard checks remain unavailable. Responsive stacking rule confirmed in source. |

## Additional graphics — November 3, 2026

| ID | What is tested | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| G01 | Vector markup | Extract every inline svg and parse each using the XML parser. | All drawings are well formed. | Pass — all 9 SVG elements, including the existing hero drawing. |
| G02 | Accessible graphics | Inspect the four large illustration SVGs and the skills decoration. | Each informative illustration has role=img and a descriptive accessible label; redundant skills art is hidden from screen readers. | Pass — source inspection. |
| G03 | Honest illustration labels | Inspect architecture, circuit, and browser labels/captions. | Art is distinguishable from actual models, schematics, or screenshots. | Pass — illustrations explicitly identified; no new project outcomes claimed. |
| G04 | Structure and links | Verify one h1, unique IDs, no inline styling, and all local href/src/data-image references. | Existing story and links remain intact. | Pass — 30 local references resolved, unique IDs and one h1. |
| G05 | CSS and motion safeguards | Check stylesheet brace balance and selectors for new trace/click-marker animations. | Animations require initialized pause control and no reduced-motion preference; existing pause rule applies. | Pass — source checks. No JavaScript changed. Actual animation playback not tested. |
| G06 | Themes and responsive rules | Inspect use of existing theme tokens, responsive SVG sizing, and two-column phone skills layout. | Graphics inherit both themes and reflow without fixed page widths. | Pass — source inspection only. Rendered layout remains G07. |
| G07 | Browser review | At 320, 390, 768, and 1366px, scroll through Experience, house/circuit illustrations, software, and Skills in both themes. Test short windows and zoom. | Graphics fit, text/captions remain readable, and the experience illustration fits the sticky column. | Not run — no browsers/apps exposed by computer-use inventory. |
| G08 | Native motion/accessibility | Pause/resume, enable system reduced motion, disable JS, use the keyboard, and run Lighthouse. | Motion stops as requested; static drawings and all links remain; accessibility ≥90. | Not run — browser unavailable. No Lighthouse score recorded. |

Review: refresh `index.html` and use the chapter links to compare the new graphics. Existing Pages acceptance remains unexecuted; no deployment was performed.

## House/circuitry removal — November 3, 2026

These results supersede earlier entries concerning the removed exploration section and its illustrations. Historical results are retained above.

| ID | What is tested | Steps | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| R01 | Removal and remaining structure | Search index.html for house/circuitry/explorations/tool references; inspect section sequence, h1, IDs, balanced HTML and chapter numbers. | Removed content absent; seven sections; unique IDs and one h1; software chapter 04 and skills chapter 05. | Pass — source checks, including balanced HTML tags. |
| R02 | Remaining links and model story | Resolve local href/src/data-image references and inspect model-step count. | No broken local targets; four crutch-holder views retained. | Pass — all 30 local references resolve, four story steps retained. |
| R03 | Visual scroll review | Refresh index.html at phone/laptop widths; scroll directly from crutch holder to software, then Skills and Contact; use overview links. | No empty exploration section or numbering gap; remaining sections and graphics display correctly. | Not run — browser review remains pending. No JavaScript changes. |
