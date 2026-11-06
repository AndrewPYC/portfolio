# Personal Portfolio Project Instructions

## Purpose and scope

Build a personal portfolio that presents my background, projects, skills, and contact information for a class assignment. Keep the code simple enough for me to understand and explain during a three-minute demo.

Work on one small task at a time. Complete only the requested task; do not build the entire site at once. Explain what changed, how to review it, and any testing that still needs to be done. Let me review changes before committing them.

## Page and content

Use one detailed scrollytelling page, `index.html`, with chapter links in the navigation. This replaces the original five-page requirement, as requested by Andrew on October 29, 2026.

- Introduction — name, education, and an invitation to follow the story.
- Background and experience — personal background, education, work, and interests.
- Projects — detailed sections for the crutch holder and Clicker Co, with relevant images and links. Andrew requested removing house and circuitry design on November 3, 2026; keep the two approved projects and do not add a third without supplied details.
- Skills — technical skills and honest descriptions of experience.
- Contact — Andrew’s approved LinkedIn button. Andrew requested replacing the public email with LinkedIn and removing the “See the portfolio on GitHub” link on November 5, 2026. His supplied profile URL is `https://www.linkedin.com/in/andrew-soliman-477185449/`.

Ask me for missing personal information, project details, images, and contact links when needed. Do not invent credentials, experience, projects, or URLs. Do not leave placeholder text or empty sections in the finished site.

## Approved design

Current direction approved November 5, 2026: a cinematic dark navy, violet, blue, and cyan design with actual Three.js rendering, reflective lighting, glass panels, and pointer interaction. Keep orange AS identity accents, the full story and original project images, light/dark mode, saved preferences, responsive navigation, pause/resume, and reduced-motion/no-JavaScript access. The hero pairs the introduction and orbital sculpture, with the overview below. This supersedes the earlier palette and compact orbital placement described below. A locally vendored Three.js r160 classic build is the sole approved runtime dependency, preserving double-click local opening without npm, frameworks, or a build step. Use adaptive graphics and static fallback artwork; do not claim measured frame rates or rendered accessibility results without testing them.

Andrew approved the following updated direction on October 29, 2026:

- Style: one detailed scrolling story, using chapter headings, generous spacing, and sticky project imagery that follows the narrative.
- Colors: black (`#000000`) background with orange text by default.
- Theme control: include a light/dark mode button. Light mode uses a light background and a darker orange for readable contrast. This replaces the five-color dropdown.
- Save the selected mode in `localStorage` and restore it on reload. If storage is unavailable, the button must still change the current page.
- Adjust text, links, controls, surfaces, and focus indicators for both themes so each remains readable and meets accessibility contrast requirements.
- Font: a system sans-serif stack such as `Arial, Helvetica, sans-serif`; no external font dependency.
- Layout: a centered content area, sticky chapter navigation, footer, and responsive layouts for phones and laptops.
- Navigation: visible links on larger screens and an accessible menu button on small screens.
- Interactivity: responsive navigation, light/dark mode, reading progress, and project imagery that updates as the reader scrolls.
- Motion: subtle and optional; respect reduced-motion preferences. Keep all content accessible without scroll effects or JavaScript, including links to every model image.

Andrew requested combining motion concepts 2 (Engineering Blueprint) and 3 (Orbital Workshop) into the main portfolio on October 29, 2026. Use a blueprint grid and animated construction lines around a decorative orbital hero assembly, floating skill labels, and a scanning/pointer-tilt treatment on the existing scrolling project images. Keep the full narrative, black/orange and light themes, and natural scrolling. Include a pause/resume control; reduced-motion preferences take priority, and no-JavaScript pages remain static. Decorative geometry must not imply actual project dimensions or fabricated engineering results.

Update this file when I approve a change to the design or project rules.

Andrew requested a website overview at the very beginning on the right side on October 29, 2026. The opening's right-hand panel should summarize and link to My story, Experience, Projects, Skills, and Contact. Keep the orbital decoration compact beneath the overview; stack the overview below the introduction on phone screens.

Andrew requested more graphics across the website on November 3, 2026. Extend the orange blueprint style with original, theme-aware vector illustrations for hands-on experience, software, and skills. Clearly label conceptual illustrations; do not present them as actual project photos, screenshots, models, or schematics. Any added motion must follow the existing pause control and reduced-motion/no-JavaScript behavior. His subsequent request on November 3 removes the house/circuitry sections, related illustrations, and references from the overview, biography, experience, and skills.

## Technical rules

- Use only plain HTML5, CSS, and JavaScript.
- No backend, database, login, frameworks, component libraries, build tools, or npm. Do not add React, Vue, Tailwind, or Bootstrap.
- The site must work by double-clicking `index.html` and on GitHub Pages under `/portfolio/`.
- Use relative file paths for internal links, scripts, stylesheets, and images. Avoid paths beginning with `/`.
- Use one shared external stylesheet, `css/styles.css`; no inline styles.
- Put shared JavaScript in `js/script.js` and load it with `defer`. Keep scripts compatible with opening HTML files locally; do not rely on a server or fetch for page content.
- Store images in `images/`, use descriptive filenames, and keep each image under 500 KB.
- Avoid unnecessary dependencies, clever abstractions, and unrelated changes.
- Never put API keys, passwords, tokens, a home address, or a phone number in this public repository or website.
- Do not implement a contact form unless requested. If added, validate valid and invalid input with JavaScript and direct visitors to email. Never claim the form sends or stores messages.

## Accessibility and responsive behavior

- Use semantic elements such as `header`, `nav`, `main`, `section`, and `footer`.
- Give the page a meaningful title, exactly one `h1`, and logically ordered chapter headings.
- Include a keyboard-accessible skip link and visible focus indicators.
- Provide descriptive alt text for informative images and empty alt text for decorative images.
- Use descriptive links, native buttons for actions, and labels for any form controls.
- Make every interactive control usable with a keyboard. Use appropriate native keyboard behavior, including Enter for links and Enter/Space for buttons.
- The mobile menu must open and close, expose its expanded state, and avoid leaving hidden links in the keyboard tab order.
- The theme button must work by click, touch, Enter, and Space, with an accessible label for its action. Navigation links must jump to chapters without the sticky header obscuring their headings.
- Scroll effects must preserve natural scrolling and keyboard access. Do not hide narrative text until JavaScript runs. Short windows and reduced-motion settings should have a readable static layout.
- Support phone and laptop widths without horizontal scrolling. Use media queries and flexible images/layouts.
- Aim for a Lighthouse Accessibility score of at least 90.

## Testing and documentation

After each change, perform relevant available checks and provide clear manual review steps. Review in VS Code Live Preview, at a phone-sized width, and with the keyboard. Never claim a check passed unless it was actually run; identify checks that need my browser or live deployment.

Create and maintain `TESTING.md` as the site develops. Include at least 12 test cases, with an ID, what is tested, steps, expected result, and actual Pass/Fail result after execution. Mark unexecuted cases as Not run. Include enough cases or explicit substeps to cover:

- Every navigation and chapter link.
- The complete page at phone and laptop sizes.
- Every JavaScript feature, including valid and invalid form inputs if a form is added.
- Both color modes, persistence on reload, readable contrast in each theme, and theme-button operation with click, touch, and keyboard.
- Scrolling model views in both directions, active chapter navigation, reading progress, reduced motion, and no-JavaScript access.
- Keyboard navigation through the entire page.
- Lighthouse Accessibility score.
- Local opening through `index.html` and working links/images on GitHub Pages.

Run final acceptance tests on the live GitHub Pages site. Record the tested URL and date. Preserve failed results, document fixes, and record retest results instead of erasing the failure history.

Keep `README.md` updated with the project description, live website link, local viewing instructions, and acknowledgments for borrowed assets or code.

Keep factual notes about challenges and corrections for the final 1–2 page report. The report needs repository and live-site links at the top, a feature overview, challenges and solutions, a real example of a Codex mistake and its correction, and phone/laptop screenshots. Do not fabricate a mistake or test result.

## Git and deployment workflow

- Check the working tree before changes and preserve unrelated work.
- After each small task and my review, make a focused commit with a clear message, then push to GitHub. Ask for push approval as required by the assignment or environment.
- Never commit secrets, unrelated files, or unfinished placeholder content.
- Use `git revert` to undo a committed change. Do not use destructive reset commands or force pushes.
- Deploy through GitHub Pages using branch `main` and folder `/` (repository root).
- Verify the actual GitHub username and repository before recording the live URL; the expected pattern is `https://<username>.github.io/portfolio/`.
- Support steady progress over multiple days. Do not fabricate, backdate, or split commits merely to simulate activity.

## Suggested checkpoints

1. Setup and content: review this file, confirm repository/Pages setup, then develop the single-page story with real content.
2. Styling and interactivity: implement the approved design, responsive layout, mobile navigation, second JavaScript feature, and initial test plan.
3. Test and finish: test the live site, fix issues, complete documentation and report, and prepare to explain the JavaScript during the demo.
