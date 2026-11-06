# Factual development notes

November 5, 2026 — 3D redesign and commit preparation:

- Added a locally vendored Three.js r160 classic build and MIT license to preserve direct local-file opening. Implemented the decorative orbital sculpture with PBR materials, procedural studio reflections, emissive inlays, particles, shadows on higher quality settings, and pointer-responsive lighting/camera movement. Added the navy/violet/cyan theme, light palette, glass panels, and card depth.
- Added viewport-based loading, offscreen/hidden-tab suspension, pause/reduced-motion handling, economy settings and automatic quality reduction after sustained slow frames, and static fallback artwork. Actual WebGL rendering and frame rate remain unverified.
- Browser automation stopped because it could not reliably determine the browser URL. Source validation passed for five HTML files, 94 local references, both JavaScript files’ syntax, CSS brace balance, and the final LinkedIn contact content. Project file inventory and a credential-pattern scan passed.
- Updated stale current-design/dependency statements before the user-requested local Git commit. Existing historical test results remain preserved. No push or deployment requested or performed in this turn.

November 5, 2026 — contact update:

- Final contact change: removed “See the portfolio on GitHub” at Andrew’s request. The LinkedIn button remains the contact action. Source checks confirmed the removal and retained exact LinkedIn destination; no browser check, commit, or deployment.

- Andrew requested replacing the bottom email with a LinkedIn button. Removed the email link and email-app prompt; retained the contact section and GitHub link.
- Source checks confirmed the removal. The LinkedIn button is pending Andrew’s exact profile URL; no profile was guessed. Browser activation/layout checks remain unrun. No commit or deployment.
- Follow-up: Andrew supplied `https://www.linkedin.com/in/andrew-soliman-477185449/`. Added a native link labeled “Connect on LinkedIn” using the existing gradient button and wrapping actions layout; kept the GitHub link. The exact destination, absence of email content, and existing contact navigation were checked in source. Browser activation/layout checks remain unrun. No commit or deployment.

October 29, 2026 — content and multipage implementation.

- Read Andrew’s portfolio Google Doc, including its four embedded crutch-holder model images. Organized the information into five separate HTML pages with shared navigation, CSS, and JavaScript.
- Used the email Andrew explicitly supplied in chat: `andrewsoliman12@gmail.com`.
- Kept house-design and circuitry-design entries brief because the source does not describe tools, goals, outcomes, or contributions. No such details were invented. Actual images for these entries are still missing.
- Downloaded and resized the four source photos to keep each below 500 KB. Stored the clicker-game QR locally so it has no runtime service dependency.
- Corrected an actual implementation mistake: the first Blue-gray palette used `#192a3d` for muted text against `#748ca8`, which measured 4.21:1. Changed muted text to `#142132`; the retest measured 4.68:1. The initial failure and retest are now preserved in `TESTING_HISTORY.md`.
- Checked all relative links, fragment targets, image sizes, headings, and JS syntax. Executed menu/theme logic with a simulated DOM, including denied storage. These checks do not establish browser or Lighthouse results.
- No browser was exposed by the computer-use inventory, so Live Preview, phone/laptop screenshots, physical keyboard/touch checks, and Lighthouse audits were not performed.
- Existing repository: `https://github.com/AndrewPYC/portfolio`. Intended Pages destination: `https://andrewpyc.github.io/portfolio/`, not tested or deployed in this task.
- Git initially reported different directory ownership in the sandbox. Read-only Git checks used a per-command safe-directory option; no global Git configuration was changed.
- The existing untracked `AGENTS.md` was preserved. No commit, push, or deployment was made pending the project’s requested review.

Follow-up on October 29, 2026:

- Andrew requested typical tools and newly drafted goals for the house-design and circuitry-design entries. Added a suggested small-home floor-plan/3D-model goal and a suggested LED-circuit simulation goal.
- Labeled the goals as “Suggested project goal” and tools as “Typical tools to consider.” Actual tool use and project outcomes remain unconfirmed; no new skills were claimed on the Skills page.
- Linked official SketchUp architecture and Tinkercad Circuits pages as examples of suitable tools. Actual project images remain outstanding.

Single-page redesign on October 29, 2026:

- Andrew requested one detailed scrollytelling page, a black background with orange text, and a light/dark mode button. Updated `AGENTS.md` to replace the earlier five-page, white-background, and five-color requirements with this approved direction.
- Consolidated content into `index.html` and removed the four superseded HTML pages. Chapter navigation now uses local anchors.
- Added a sticky four-view model story, corresponding captions/alt text/full-size links, active chapter indication, and a reading-progress bar. The story follows normal scrolling in both directions; all text and individual model-image links remain in HTML without JavaScript.
- Added a black/orange default and warm light mode, saved under a new storage key so older five-color preferences do not override the requested default. Blocked storage still allows switching the current page.
- Added short-window and reduced-motion static layouts. Confirmed only source and simulated behavior; browser visibility and actual sticky/keyboard behavior have not been verified.
- Text contrast checks passed with minimum checked ratios of 8.02:1 in dark mode and 5.27:1 in light mode. Simulated tests passed for both themes, storage failure, mobile navigation/focus, all four model scenes in both directions, chapter tracking, reading progress, and frame scheduling.
- Preserved previous test records in `TESTING_HISTORY.md`; `TESTING.md` now covers the redesign. No commit, push, or deployment was made.

For the eventual class report: use these facts, add actual phone/laptop screenshots and live test results, and verify the deployed URL. The final report itself has not been created.

Motion-direction studies on October 29, 2026:

- Andrew requested three mockups proposing more dynamic moving elements for the scrollytelling portfolio. Added a comparison gallery and three working local studies: Kinetic Editorial, Engineering Blueprint, and Orbital Workshop.
- Reused supplied crutch-holder photographs and approved background facts. Blueprint geometry and the orbital assembly are decorative, not fabricated project models, dimensions, or outcomes.
- Kept the complete portfolio at `index.html`. Namespaced the additional CSS and dispatched mockup behavior through a separate function in the existing shared script. No new dependencies or build process were introduced.
- Added pause/resume, system reduced-motion handling, separate mockup theme persistence, four-view buttons, bounded scroll shifts, and pointer tilt with touch fallback.
- During source review, found that automatic CSS animations would otherwise run without JavaScript while pause controls were hidden. Gated automatic loops behind a class added only after the controls initialize, leaving no-JS pages static.
- Verified 62 local references, page structure, JS syntax, simulated controls/media/storage behavior, original-controller initialization, and inherited text contrast. Computer-use inventory returned no browsers or apps, so visual rendering, actual animation playback, phone/keyboard/touch review, screenshots, and Lighthouse remain unverified.
- Updated README and TESTING with review steps and actual verification limits. No direction has been selected for integration; no commit, push, or deployment was made.

Blueprint + Orbital integration on October 29, 2026:

- Andrew selected a combination of concepts 2 and 3 for the actual portfolio. Updated index.html with an orbital assembly and floating skill labels inside a blueprint-grid panel with animated construction lines. The drawing remains explicitly decorative.
- Added a scanning guide and bounded pointer tilt to the existing sticky model stage; retained the full eight-section narrative, four scrolling model views, theme controls, navigation, and contact/project destinations.
- Added a header pause/resume button with saved preference, blocked-storage fallback, and system reduced-motion priority. Automatic animation requires the initialized pause control, leaving no-JavaScript pages static.
- Added a compact theme-button presentation below 400px to make room for the extra header control. Visual sizing still needs a browser check.
- Updated AGENTS.md for the requested combined direction. Source checks passed for JS syntax, stylesheet brace balance, one h1/unique IDs, all eight sections, and 25 local references. Simulated checks passed for motion preferences, live reduced-motion changes, blocked storage, ±3-degree tilt and touch fallback, all four model scenes in both directions, reading progress, mobile menu/focus, and theme restoration.
- Browser inventory still exposed no apps or browsers. No rendered screenshots, native keyboard/touch results, Lighthouse score, or live deployment checks are claimed. Changes remain local and uncommitted for review.

Opening overview on October 29, 2026:

- Andrew requested an overview at the beginning on the right side. Added an accessible aside in the opening's right column with descriptions and links to My story, Experience, Projects, Skills, and Contact.
- Kept the orbital illustration beneath the overview at a compact size and reused the existing phone stacking layout and both theme palettes. No JavaScript changes were needed.
- Verified all five destinations, unique IDs, one h1, retained illustration markup, stylesheet brace balance, and responsive stacking rules in source. Browser layout and keyboard review remain unexecuted. Updated AGENTS.md, README, and TESTING; no commit, push, or deployment.

More graphics on November 3, 2026:

- Andrew requested more graphics. Added four original SVG illustration panels (tools, architecture, circuit board, and browser) and a four-node connected-skills diagram throughout the existing story.
- Used native inline SVG and the shared stylesheet so the drawings inherit the established dark/light orange palettes without downloads, external fonts, dependencies, or image-generation services.
- Labeled the house/circuit illustrations as conceptual and the browser art as illustrative, preserving the distinction from actual project photos, schematics, and screenshots. House/circuit project photos remain missing.
- Added moving trace accents and a rotating click marker using CSS gated by the existing initialized motion control and no-preference media query. The existing pause/reduced-motion rules cover the added animation; no JavaScript changed.
- All 9 inline SVG elements parsed as XML. Source checks passed for four accessible illustration labels, hidden redundant skills decoration, concept captions, one h1/unique IDs, 30 local references, CSS braces, theme tokens, responsive rules, and motion guards.
- Browser inventory returned no apps/browsers. Rendered layout, physical input, animation playback, and Lighthouse remain unverified. Updated project instructions/docs/test log; changes remain local and uncommitted.

House/circuitry removal on November 3, 2026:

- Andrew requested removing the house-design and circuitry-design parts. Removed their complete exploration section, illustrations, suggested goals, tool links, and related unused CSS.
- Removed related references from the opening overview, background, trade-experience text, and design-skills description. The remaining projects are the crutch holder and Clicker Co. Renumbered software to chapter 04 and skills to 05.
- Updated AGENTS.md to reflect the two requested projects rather than inventing a third. Updated current README/test content while preserving historical development/test records.
- Source checks passed: no removed-topic references in index.html, seven remaining sections, balanced HTML tags and CSS braces, unique IDs, one h1, all 30 local references, and all four crutch-holder story steps. No JavaScript changes, browser-rendered review, commit, push, or deployment.
