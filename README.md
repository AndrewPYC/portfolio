# Andrew Soliman’s portfolio

A detailed, single-page scrollytelling portfolio built with plain HTML, CSS, and JavaScript. The November 5, 2026 redesign adds a navy, violet, and cyan interface and an interactive Three.js orbital sculpture, with orange signature accents, a light theme, and the original narrative and project links.

## Compare three animation directions

Open [the motion-study gallery](mockups/index.html) directly in your browser or in VS Code Live Preview. Each concept is a working, responsive preview with a hero, project scene, four selectable crutch-holder images, light/dark mode, and a motion pause button.

1. [Kinetic Editorial](mockups/kinetic.html): scroll-linked typography, a moving skills ribbon, and a gently shifting project frame. Recommended as the closest continuation of the current design.
2. [Engineering Blueprint](mockups/blueprint.html): animated construction lines, an engineering grid, and a scanning guide around the real model images. The abstract drawing is decorative, not a project drawing or a measurement claim.
3. [Orbital Workshop](mockups/orbital.html): an abstract rotating assembly, floating skill labels, and pointer-responsive model perspective. View selection also works with touch and keyboard.

These retained design studies share the external stylesheet and script, use supplied images, and require no installation. Their theme preference is stored separately from the main portfolio. Reduced-motion preferences disable animation; without JavaScript the studies are static and image links remain available.

Source and simulated interaction checks passed. Rendered browser, phone, keyboard/touch, and Lighthouse reviews remain to be done; see the motion-study test log in `TESTING.md`.

## Follow the story

Open `index.html` directly in a browser, or use VS Code Live Preview. No installation, server, build step, framework, or external font is required.

The main portfolio extends Engineering Blueprint and Orbital Workshop with actual WebGL geometry: metallic orbital rings, emissive inlays, a faceted core, particles, procedural environment reflections, and pointer-responsive lighting and camera movement. The sculpture is decorative; the project images remain the supplied model photographs. Glass panels, gradient buttons, and subtle card tilt carry the visual design through the story.

The opening pairs the introduction with the orbital sculpture. An overview below links to My story, Experience, Projects, Skills, and Contact. The layout stacks on phones.

The story also includes original vector graphics: a tools illustration in Experience, a browser illustration above the software project, and a connected-skills diagram. The art follows both color themes; moving traces and a rotating click marker follow Pause motion and reduced-motion settings. The browser art is illustrative, not a game screenshot.

Use **Pause motion** in the header to stop the animation, or **Resume motion** to restart it. The preference survives reload when storage is available. System reduced-motion settings take priority. On touch devices the project story still follows normal scrolling; pointer tilt is optional. With JavaScript disabled, the decorative elements stay static and all narrative/model links remain accessible.

Current source checks passed for all five HTML pages and 94 local references, JavaScript syntax, CSS brace balance, and the LinkedIn contact update. Browser automation stopped because it could not verify the browser URL; rendered WebGL, phone/keyboard/touch review, Lighthouse, and live deployment remain unverified. Earlier simulated results in the test logs describe earlier implementations.

Three.js loads from a local, pinned classic build when the scene approaches the viewport. This keeps direct `file:` opening compatible without a build step or runtime CDN. On small or lower-powered devices, the scene reduces resolution, particles, and shadows and targets 30 FPS; it also downgrades after sustained slow frames. Animation suspends offscreen, in hidden tabs, when paused, and with reduced motion. A static illustration remains available if JavaScript or WebGL is unavailable. A 60 FPS target on capable devices has not been measured.

The page follows this sequence:

1. Introduction — Andrew’s name, NJIT studies, and hands-on background.
2. Background — first-generation college experience and current interests.
3. Experience — trade work, security, lifeguarding, and wrestling.
4. Crutch-holder design — four model views with an accompanying scrolling narrative.
5. Software — the clicker game, a playable link, and a downloadable QR code.
6. Skills — honest descriptions of trade, Python, AI-assisted coding, and design experience.
7. Contact — a **Connect on LinkedIn** button linking to [Andrew’s profile](https://www.linkedin.com/in/andrew-soliman-477185449/). The public email and GitHub contact link were removed at Andrew’s request on November 5, 2026.

All chapter navigation uses anchors on this one page. The four old HTML pages have been removed.

## Scrolling and controls

- The header stays available while reading, with chapter links and a light/dark button.
- The default uses dark navy surfaces, light text, cyan and violet accents, and orange identity details. Light mode uses pale surfaces with darker text and accents.
- The button names the mode it will switch to. The choice is saved in `localStorage`; blocked storage does not prevent switching the current page.
- The crutch-holder image, caption, alt text, and full-size image link update as each narrative step scrolls into view. Scroll backward to revisit earlier views.
- Chapter links indicate the current part of the story, and a thin progress bar follows the page position.
- At phone widths, a Menu button opens the chapter navigation. Selecting a chapter closes the menu and moves focus to that chapter.
- Reduced-motion settings and short windows use a static layout; smooth scrolling is enabled only when reduced motion is not requested.
- All narrative text and individual model-image links are present in HTML. With JavaScript disabled, the story and links remain accessible, navigation stays visible, and script-dependent controls remain hidden.

## Files

- `index.html` — the complete story.
- `css/styles.css` — layout, responsive rules, and two theme palettes.
- `js/script.js` — themes, mobile navigation, model scenes, chapter tracking, and reading progress.
- `js/vendor/` — pinned Three.js r160 classic build and its MIT license; r160 was chosen for direct local-file compatibility. Future library upgrades must preserve that compatibility or explicitly revise the architecture.
- `images/` — supplied model photos and the local QR image.
- `TESTING.md` — current checks and manual review steps.
- `TESTING_HISTORY.md` — preserved results from the earlier five-page version.
- `DEVELOPMENT_NOTES.md` — factual notes for the eventual class report.

## Repository and deployment

- Repository: [AndrewPYC/portfolio](https://github.com/AndrewPYC/portfolio), verified from the existing Git remote.
- Intended live URL: [GitHub Pages portfolio](https://andrewpyc.github.io/portfolio/). Deployment and availability have not been verified in this task.
- Intended Pages configuration: branch `main`, folder `/` (repository root).

The user requested a local Git commit on November 5, 2026. No push or deployment was performed.

## Verification and remaining content

Current source checks passed; browser rendering, phone/laptop layout, physical keyboard/touch use, current-theme contrast, QR scanning, Lighthouse, and live Pages acceptance remain untested. Follow `TESTING.md` in Live Preview before publishing.

The detailed crutch-holder narrative distinguishes visible model details from possible next steps. The two featured projects are the crutch holder and Clicker Co; Andrew requested removing the house and circuitry design content on November 3, 2026.

## Acknowledgments

- Biography, experience, project information, and four crutch-holder model photos were supplied by Andrew in his Google Doc. The approved email was supplied in chat.
- Each model photo was resized below 500 KB.
- The QR image was generated using the QR Server API (`api.qrserver.com`) for the public [clicker game](https://andrewpyc.github.io/Clicker-game-/) URL. It is stored locally with no runtime service dependency.
- Code and layout were prepared with Codex. The 3D scene uses [Three.js r160](https://github.com/mrdoob/three.js/tree/r160), distributed locally under the [MIT license](js/vendor/THREE-LICENSE.txt).
- The tools, browser, and skills graphics were drawn as original inline SVG with Codex on November 3, 2026. They use the shared stylesheet and require no external assets, services, or libraries.
