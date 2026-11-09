// Theme, mobile navigation, and scroll storytelling. No server is needed.
// The design studies use their own small controller; the full portfolio stays separate.
if (document.body.classList.contains('motion-mockup')) {
  initializeMotionStudies();
} else {
const themeButton = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const storageKey = 'andrew-portfolio-color-mode';

function applyTheme(theme) {
  const light = theme === 'light';
  document.documentElement.dataset.theme = light ? 'light' : 'dark';
  themeLabel.textContent = light ? 'Dark mode' : 'Light mode';
  themeButton.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
  themeMeta.setAttribute('content', light ? '#f3f5fc' : '#060914');
  document.dispatchEvent(new CustomEvent('portfolio:themechange'));
}

try {
  applyTheme(localStorage.getItem(storageKey));
} catch {
  applyTheme('dark');
}
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try {
    localStorage.setItem(storageKey, next);
  } catch {
    // The button still works if the browser blocks saved preferences.
  }
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
const navigationLinks = navigation.querySelectorAll('a');
const smallScreen = window.matchMedia('(max-width: 760px)');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.hidden = smallScreen.matches && !open;
}

function updateNavigation() {
  menuButton.hidden = !smallScreen.matches;
  setMenu(false);
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});
smallScreen.addEventListener('change', updateNavigation);
updateNavigation();

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setMenu(false);
    if (smallScreen.matches) {
      // Move focus out of the collapsed menu to the chosen chapter.
      const destination = document.querySelector(link.getAttribute('href'));
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
  });
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && smallScreen.matches && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!navigation.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
});

// Each story step carries its own model image, description, and caption.
const designSteps = document.querySelectorAll('.design-step');
const stageImage = document.querySelector('.stage-image');
const stageLink = document.querySelector('.stage-image-link');
const stageCaption = document.querySelector('.stage-caption');
const sceneCounter = document.querySelector('.scene-counter');
const progress = document.querySelector('.reading-progress');
const chapters = document.querySelectorAll('[data-chapter]');
let scrollScheduled = false;
let manualModelView = false;
let currentModelIndex = -1;
const modelViewButtons = document.querySelectorAll('[data-model-view]');
const followButton = document.querySelector('.model-follow');
const modelDialog = document.querySelector('.model-dialog');

function selectModel(index) {
  currentModelIndex = (index + designSteps.length) % designSteps.length;
  const step = designSteps[currentModelIndex];
  stageImage.setAttribute('src', step.dataset.image);
  stageImage.setAttribute('alt', step.dataset.alt);
  stageLink.setAttribute('href', step.dataset.image);
  stageCaption.textContent = step.dataset.caption;
  sceneCounter.textContent = String(currentModelIndex + 1).padStart(2, '0') + ' / 04';
  modelViewButtons.forEach((button, view) => button.setAttribute('aria-pressed', String(view === currentModelIndex)));
  if (modelDialog) {
    modelDialog.querySelector('.dialog-image').src = step.dataset.image;
    modelDialog.querySelector('.dialog-image').alt = step.dataset.alt;
    modelDialog.querySelector('.dialog-caption').textContent = step.dataset.caption;
  }
}
function setManualView(index) {
  manualModelView = true;
  selectModel(index);
  if (followButton) followButton.setAttribute('aria-pressed', 'false');
  const mode = document.querySelector('.model-mode');
  if (mode) mode.textContent = 'Manual view · select Follow scroll to reconnect';
}
const modelControls = document.querySelector('.model-controls');
if (modelControls) {
  modelControls.hidden = false;
  modelViewButtons.forEach((button) => button.addEventListener('click', () => setManualView(Number(button.dataset.modelView))));
  followButton.addEventListener('click', () => {
    manualModelView = false;
    followButton.setAttribute('aria-pressed', 'true');
    document.querySelector('.model-mode').textContent = 'Scroll to explore the model';
    updateStory();
  });
}
if (modelDialog && typeof modelDialog.showModal === 'function') {
  const closeDialog = () => { modelDialog.close(); document.body.classList.remove('inspection-open'); };
  function openDialog() {
    if (modelDialog.open) return;
    modelDialog.showModal();
    document.body.classList.add('inspection-open');
  }
  document.querySelector('.model-zoom').addEventListener('click', openDialog);
  stageLink.addEventListener('click', (event) => { event.preventDefault(); openDialog(); });
  modelDialog.querySelector('.dialog-close').addEventListener('click', closeDialog);
  modelDialog.addEventListener('close', () => document.body.classList.remove('inspection-open'));
  modelDialog.querySelector('.dialog-prev').addEventListener('click', () => setManualView(currentModelIndex - 1));
  modelDialog.querySelector('.dialog-next').addEventListener('click', () => setManualView(currentModelIndex + 1));
  modelDialog.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    setManualView(currentModelIndex + (event.key === 'ArrowRight' ? 1 : -1));
  });
  modelDialog.addEventListener('click', (event) => {
    const rect = modelDialog.getBoundingClientRect();
    if (event.target === modelDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeDialog();
  });
} else if (document.querySelector('.model-zoom')) document.querySelector('.model-zoom').hidden = true;

function updateStory() {
  const viewportHeight = window.innerHeight;
  const sceneTrigger = smallScreen.matches ? viewportHeight * .85 : viewportHeight * .55;
  let activeStep = designSteps[0];
  let activeIndex = 0;
  designSteps.forEach((step, index) => {
    if (step.getBoundingClientRect().top <= sceneTrigger) {
      activeStep = step;
      activeIndex = index;
    }
  });
  if (!manualModelView && currentModelIndex !== activeIndex) selectModel(activeIndex);
  designSteps.forEach((step) => step.classList.toggle('is-active', step === activeStep));

  let currentChapter = '';
  chapters.forEach((chapter) => {
    if (chapter.getBoundingClientRect().top <= viewportHeight * .4) currentChapter = chapter.dataset.chapter;
  });
  navigationLinks.forEach((link) => {
    const destination = document.querySelector(link.getAttribute('href'));
    if (destination.dataset.chapter === currentChapter) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });

  const distance = document.documentElement.scrollHeight - viewportHeight;
  progress.value = distance > 0 ? Math.max(0, Math.min(100, window.scrollY / distance * 100)) : 0;
}

// Limit work to once per animation frame, even with many scroll events.
function scheduleStoryUpdate() {
  if (scrollScheduled) return;
  scrollScheduled = true;
  window.requestAnimationFrame(() => {
    updateStory();
    scrollScheduled = false;
  });
}

progress.hidden = false;
window.addEventListener('scroll', scheduleStoryUpdate, { passive: true });
window.addEventListener('resize', scheduleStoryUpdate);
window.addEventListener('load', scheduleStoryUpdate);
updateStory();
initializePortfolioMotion();
if (document.body.classList.contains('immersive-portfolio')) initializeImmersivePortfolio();
}

// Blueprint line work and orbital motion for the complete portfolio.
function initializePortfolioMotion() {
  const body = document.body;
  const button = document.querySelector('.portfolio-motion-toggle');
  if (!button) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const model = document.querySelector('.model-inspection');
  let paused = false;
  try { paused = localStorage.getItem('andrew-portfolio-motion-paused') === 'true'; }
  catch { /* Motion controls still work when storage is unavailable. */ }

  function resetTilt() {
    model.style.setProperty('--inspection-x', '0deg');
    model.style.setProperty('--inspection-y', '0deg');
  }
  function renderMotion() {
    const stopped = paused || reduced.matches;
    body.classList.toggle('portfolio-motion-paused', stopped);
    document.documentElement.classList.toggle('portfolio-motion-stopped', stopped);
    button.disabled = reduced.matches;
    button.textContent = reduced.matches ? 'Reduced motion' : paused ? 'Resume motion' : 'Pause motion';
    button.setAttribute('aria-pressed', String(stopped));
    resetTilt();
    document.dispatchEvent(new CustomEvent('portfolio:motionchange'));
  }
  button.hidden = false;
  button.addEventListener('click', () => {
    paused = !paused;
    renderMotion();
    try { localStorage.setItem('andrew-portfolio-motion-paused', String(paused)); }
    catch { /* The current-page preference still applies. */ }
  });
  reduced.addEventListener('change', renderMotion);
  finePointer.addEventListener('change', resetTilt);
  model.addEventListener('pointermove', (event) => {
    if (paused || reduced.matches || !finePointer.matches) return;
    const box = model.getBoundingClientRect();
    const x = Math.max(-.5, Math.min(.5, (event.clientX - box.left) / box.width - .5));
    const y = Math.max(-.5, Math.min(.5, (event.clientY - box.top) / box.height - .5));
    model.style.setProperty('--inspection-x', (-y * 6) + 'deg');
    model.style.setProperty('--inspection-y', (x * 6) + 'deg');
  });
  model.addEventListener('pointerleave', resetTilt);
  model.addEventListener('focusout', resetTilt);
  renderMotion();
  // Automatic loops start only once an accessible pause control is available.
  body.classList.add('portfolio-motion-ready');
}

function initializeMotionStudies() {
  const body = document.body;
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const motionButton = document.querySelector('.motion-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let paused = false;
  let pendingFrame = false;

  function setTheme(value) {
    const light = value === 'light';
    root.dataset.theme = light ? 'light' : 'dark';
    themeButton.textContent = light ? 'Dark mode' : 'Light mode';
    themeButton.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    document.querySelector('meta[name="theme-color"]').content = light ? '#fff8ef' : '#000000';
  }
  try { setTheme(localStorage.getItem('andrew-portfolio-motion-theme')); }
  catch { setTheme('dark'); }
  themeButton.hidden = false;
  themeButton.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    try { localStorage.setItem('andrew-portfolio-motion-theme', root.dataset.theme); }
    catch { /* The current-page control still works with blocked storage. */ }
  });

  function motionAllowed() { return !paused && !reducedMotion.matches; }
  function resetTilt() {
    body.style.setProperty('--tilt-x', '0deg');
    body.style.setProperty('--tilt-y', '0deg');
  }
  function updateMotion() {
    body.classList.toggle('motion-paused', paused || reducedMotion.matches);
    motionButton.disabled = reducedMotion.matches;
    motionButton.textContent = reducedMotion.matches ? 'Reduced motion' : paused ? 'Resume motion' : 'Pause motion';
    motionButton.setAttribute('aria-pressed', String(paused || reducedMotion.matches));
    resetTilt();
    updateScrollMotion();
  }
  motionButton.hidden = false;
  motionButton.addEventListener('click', () => { paused = !paused; updateMotion(); });
  reducedMotion.addEventListener('change', updateMotion);
  finePointer.addEventListener('change', resetTilt);

  const views = {
    angle: ['01', 'Overall form — the holder body and threaded bolt.', 'Purple crutch-holder model showing its support body and threaded bolt.'],
    front: ['02', 'Front view — a closer look at the holder’s shape.', 'Front view of the crutch-holder model with a purple body and a vertical threaded bolt.'],
    side: ['03', 'Side view — the support profile in context.', 'Side view showing the crutch holder’s support profile and threaded bolt.'],
    detail: ['04', 'Fastening detail — the threaded opening and separate bolt.', 'Crutch-holder detail showing a threaded opening in the purple body and the separate bolt.']
  };
  const viewButtons = document.querySelectorAll('[data-view]');
  const modelImage = document.querySelector('.mock-image');
  viewButtons.forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', () => {
      const key = button.dataset.view;
      const view = views[key];
      if (!view || button.getAttribute('aria-pressed') === 'true') return;
      const path = '../images/crutch-holder-' + key + '.jpg';
      modelImage.src = path;
      modelImage.alt = view[2];
      document.querySelector('.mock-image-link').href = path;
      document.querySelector('.mock-caption').textContent = view[0] + ' / ' + view[1];
      document.querySelector('.mock-counter').textContent = view[0] + ' / 04';
      viewButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      modelImage.classList.remove('is-swapping');
      // Restart only this short transition, keeping the narrative text visible.
      if (motionAllowed()) {
        void modelImage.offsetWidth;
        modelImage.classList.add('is-swapping');
      }
    });
  });
  if (modelImage) modelImage.addEventListener('animationend', () => modelImage.classList.remove('is-swapping'));

  const kineticHeadline = document.querySelector('.kinetic-headline');
  const project = document.querySelector('.kinetic-project');
  function updateScrollMotion() {
    pendingFrame = false;
    const enabled = motionAllowed();
    const shift = enabled ? Math.min(70, Math.max(0, window.scrollY * .11)) : 0;
    body.style.setProperty('--headline-shift', shift + 'px');
    if (project) {
      const position = project.getBoundingClientRect().top;
      const modelShift = enabled ? Math.max(-22, Math.min(22, position * .035)) : 0;
      body.style.setProperty('--model-shift', modelShift + 'px');
    }
  }
  function scheduleScrollMotion() {
    if (pendingFrame) return;
    pendingFrame = true;
    window.requestAnimationFrame(updateScrollMotion);
  }
  if (kineticHeadline) {
    window.addEventListener('scroll', scheduleScrollMotion, { passive: true });
    window.addEventListener('resize', scheduleScrollMotion);
  }

  const orbitalModel = document.querySelector('.orbital-model');
  if (orbitalModel) {
    orbitalModel.addEventListener('pointermove', (event) => {
      if (!motionAllowed() || !finePointer.matches) return;
      const box = orbitalModel.getBoundingClientRect();
      const x = Math.max(-.5, Math.min(.5, (event.clientX - box.left) / box.width - .5));
      const y = Math.max(-.5, Math.min(.5, (event.clientY - box.top) / box.height - .5));
      body.style.setProperty('--tilt-x', (-y * 8) + 'deg');
      body.style.setProperty('--tilt-y', (x * 8) + 'deg');
    });
    orbitalModel.addEventListener('pointerleave', resetTilt);
    orbitalModel.addEventListener('focusout', resetTilt);
  }
  updateMotion();
  body.classList.add('motion-ready');
}

// Progressive enhancement: narrative and controls never depend on WebGL.
function initializeImmersivePortfolio() {
  const body = document.body;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const stopped = () => reduced.matches || body.classList.contains('portfolio-motion-paused');
  const cards = document.querySelectorAll('.experience-list article, .skill-table article, .qr-panel');
  function resetCard(card) {
    card.style.setProperty('--card-x', '0deg');
    card.style.setProperty('--card-y', '0deg');
  }
  cards.forEach((card) => {
    card.classList.add('depth-card');
    card.addEventListener('pointermove', (event) => {
      if (stopped() || !finePointer.matches || event.pointerType === 'touch') return;
      const rect = card.getBoundingClientRect();
      const x = Math.max(-.5, Math.min(.5, (event.clientX - rect.left) / rect.width - .5));
      const y = Math.max(-.5, Math.min(.5, (event.clientY - rect.top) / rect.height - .5));
      card.style.setProperty('--card-x', (-y * 5) + 'deg');
      card.style.setProperty('--card-y', (x * 5) + 'deg');
    });
    card.addEventListener('pointerleave', () => resetCard(card));
    card.addEventListener('focusout', () => resetCard(card));
  });
  document.addEventListener('portfolio:motionchange', () => cards.forEach(resetCard));
  finePointer.addEventListener('change', () => cards.forEach(resetCard));

  if ('IntersectionObserver' in window) {
    const arrivals = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!stopped()) entry.target.classList.add('is-entering');
        arrivals.unobserve(entry.target);
      });
    }, { threshold: .12 });
    document.querySelectorAll('.intro-grid, .fact-strip, .experience-list article, .project-intro, .browser-graphic, .skill-table article, .contact-section').forEach((item) => {
      arrivals.observe(item);
      item.addEventListener('animationend', () => item.classList.remove('is-entering'));
    });
  }
}
