# Andrew Soliman’s portfolio

A detailed, single-page scrollytelling portfolio built with plain HTML, CSS, and JavaScript. The interface uses navy, violet, and cyan, with orange signature accents, a light theme, the original narrative and project links, and an interactive viewer for the supplied model images. The Clicker Co section links directly to Andrew’s GitHub profile.

## Interactive preview — November 9, 2026

Andrew approved this version for commit and push with his November 9 request:

- Andrew requested a **Visit my GitHub** button linking to [AndrewPYC](https://github.com/AndrewPYC) beside **Clicker Co**, replacing **Save the QR code**. The scannable QR image remains. The hero map, its rendering code, and the earlier standalone art demos are removed.
- Four project-view buttons select the real crutch-holder images. Manual selection persists until **Follow scroll** is selected. **Inspect full size** opens an image dialog with previous/next buttons and Left/Right arrow navigation; Escape closes the native dialog. Original image links remain in the narrative without JavaScript.
- The main page no longer loads Three.js or creates a WebGL scene. Both themes, saved preferences, chapter navigation, image inspection, game/QR links, and LinkedIn contact remain.

Final source checks passed for five HTML pages, 94 local references, JavaScript syntax, CSS brace balance, and the final GitHub/QR/LinkedIn configuration. Earlier simulated image-controller checks are recorded in `TESTING.md`; rendered checks describe their tested versions. The latest button layout and full keyboard/mobile review remain unverified. No new dependencies were added.

## Compare three animation directions

Open [the motion-study gallery](mockups/index.html) directly in your browser or in VS Code Live Preview. Each concept is a working, responsive preview with a hero, project scene, four selectable crutch-holder images, light/dark mode, and a motion pause button.

1. [Kinetic Editorial](mockups/kinetic.html): scroll-linked typography, a moving skills ribbon, and a gently shifting project frame. Recommended as the closest continuation of the current design.
2. [Engineering Blueprint](mockups/blueprint.html): animated construction lines, an engineering grid, and a scanning guide around the real model images. The abstract drawing is decorative, not a project drawing or a measurement claim.
3. [Orbital Workshop](mockups/orbital.html): an abstract rotating assembly, floating skill labels, and pointer-responsive model perspective. View selection also works with touch and keyboard.

These retained design studies share the external stylesheet and script, use supplied images, and require no installation. Their theme preference is stored separately from the main portfolio. Reduced-motion preferences disable animation; without JavaScript the studies are static and image links remain available.

Source and simulated interaction checks passed. Rendered browser, phone, keyboard/touch, and Lighthouse reviews remain to be done; see the motion-study test log in `TESTING.md`.

## Follow the story

Open `index.html` directly in a browser, or use VS Code Live Preview. No installation, server, build step, framework, or external font is required.

The main portfolio retains the glass panels, gradient buttons, blueprint details, and subtle card tilt from the visual redesign. Andrew requested replacing the orbital artwork with a direct GitHub button; the project images remain the supplied model photographs.

The opening presents the introduction and an overview linking to My story, Experience, Projects, Skills, and Contact. The GitHub button sits beside Clicker Co in the software section.

The story also includes original vector graphics: a tools illustration in Experience, a browser illustration above the software project, and a connected-skills diagram. The art follows both color themes; moving traces and a rotating click marker follow Pause motion and reduced-motion settings. The browser art is illustrative, not a game screenshot.

Use **Pause motion** in the header to stop the animation, or **Resume motion** to restart it. The preference survives reload when storage is available. System reduced-motion settings take priority. On touch devices the project story still follows normal scrolling; pointer tilt is optional. With JavaScript disabled, the decorative elements stay static and all narrative/model links remain accessible.

Current source checks passed for all five HTML pages and 94 local references, JavaScript syntax, CSS brace balance, and the LinkedIn contact update. Browser automation stopped because it could not verify the browser URL; rendered WebGL, phone/keyboard/touch review, Lighthouse, and live deployment remain unverified. Earlier simulated results in the test logs describe earlier implementations.

The former Three.js build and license remain archived in `js/vendor/`; the current main page does not load them. Direct `file:` opening still works without a build step or runtime CDN.

The page follows this sequence:

1. Introduction — Andrew’s name, NJIT studies, and hands-on background.
2. Background — first-generation college experience and current interests.
3. Experience — trade work, security, lifeguarding, and wrestling.
4. Crutch-holder design — four model views with an accompanying scrolling narrative.
5. Software — the clicker game, a playable link, the GitHub button, and a scannable QR code.
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

The user authorized the latest commit and GitHub push on November 9, 2026. GitHub Pages deployment and final live acceptance are separate from the Git push and remain unverified for this version.

## Verification and remaining content

Current source checks passed; browser rendering, phone/laptop layout, physical keyboard/touch use, current-theme contrast, QR scanning, Lighthouse, and live Pages acceptance remain untested. Follow `TESTING.md` in Live Preview before publishing.

The detailed crutch-holder narrative distinguishes visible model details from possible next steps. The two featured projects are the crutch holder and Clicker Co; Andrew requested removing the house and circuitry design content on November 3, 2026.

## Acknowledgments

- Biography, experience, project information, and four crutch-holder model photos were supplied by Andrew in his Google Doc. The approved email was supplied in chat.
- Each model photo was resized below 500 KB.
- The QR image was generated using the QR Server API (`api.qrserver.com`) for the public [clicker game](https://andrewpyc.github.io/Clicker-game-/) URL. It is stored locally with no runtime service dependency.
- Code and layout were prepared with Codex. The earlier 3D scene used [Three.js r160](https://github.com/mrdoob/three.js/tree/r160), retained locally under the [MIT license](js/vendor/THREE-LICENSE.txt); the current main page does not load this library.
- The tools, browser, and skills graphics were drawn as original inline SVG with Codex on November 3, 2026. They use the shared stylesheet and require no external assets, services, or libraries.
