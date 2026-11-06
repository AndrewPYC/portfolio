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
  if (stageImage.getAttribute('src') !== activeStep.dataset.image) {
    stageImage.setAttribute('src', activeStep.dataset.image);
    stageImage.setAttribute('alt', activeStep.dataset.alt);
    stageLink.setAttribute('href', activeStep.dataset.image);
    stageCaption.textContent = activeStep.dataset.caption;
    sceneCounter.textContent = String(activeIndex + 1).padStart(2, '0') + ' / 04';
  }
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

  const panel = document.querySelector('.spatial-panel');
  // Classic local script deliberately supports file: URLs without a bundler or CDN.
  const libraryURL = new URL('vendor/three.r160.min.js', document.currentScript.src).href;
  function loadScene() {
    const library = document.createElement('script');
    library.src = libraryURL;
    library.async = true;
    library.onload = () => {
      try { createOrbitalWorkshop(panel, window.THREE, stopped, finePointer); }
      catch (error) {
        // Unsupported WebGL or a failed allocation leaves the static artwork intact.
        panel.classList.remove('is-rendered');
        console.warn('The orbital workshop is using its static fallback.', error);
      }
    };
    library.onerror = () => { panel.dataset.graphics = 'fallback'; };
    document.head.appendChild(library);
  }
  if ('IntersectionObserver' in window) {
    const loader = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      loader.disconnect();
      loadScene();
    }, { rootMargin: '160px' });
    loader.observe(panel);
  } else loadScene();
}

// One bounded scene, procedural geometry and light maps; no model/texture downloads.
function createOrbitalWorkshop(panel, THREE, stopped, finePointer) {
  const viewport = panel.querySelector('.spatial-viewport');
  const canvas = panel.querySelector('canvas');
  const economical = window.matchMedia('(max-width: 760px)').matches ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.connection && navigator.connection.saveData);
  let lowQuality = Boolean(economical);
  let pixelRatio = Math.min(window.devicePixelRatio || 1, lowQuality ? 1.25 : 1.75);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !lowQuality, powerPreference: 'low-power' });
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = !lowQuality;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  panel.dataset.graphics = lowQuality ? 'economy' : 'full';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, .1, 60);
  camera.position.set(0, 1, 9.7);
  const sculpture = new THREE.Group();
  scene.add(sculpture);
  const geometries = new Set();
  const materials = new Set();
  const textures = new Set();
  function geometry(item) { geometries.add(item); return item; }
  function material(item) { materials.add(item); return item; }
  function mesh(shape, surface, parent = sculpture) {
    const item = new THREE.Mesh(shape, surface);
    item.castShadow = true;
    item.receiveShadow = true;
    parent.add(item);
    return item;
  }

  // A tiny procedural studio environment produces real PBR reflections.
  const studio = new THREE.Scene();
  studio.background = new THREE.Color(0x13152d);
  const softboxGeometry = geometry(new THREE.PlaneGeometry(8, 5));
  [[0xc9eaff, -4, 3, 2], [0x8f68ff, 4, 1, -2], [0xffffff, 0, 6, 0]].forEach(([color, x, y, z]) => {
    const lightCard = new THREE.Mesh(softboxGeometry, material(new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })));
    lightCard.position.set(x, y, z);
    lightCard.lookAt(0, 0, 0);
    studio.add(lightCard);
  });
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(studio, .1, .1, 30);
  scene.environment = environment.texture;
  pmrem.dispose();

  const silver = material(new THREE.MeshPhysicalMaterial({ color: 0xb6c8e8, metalness: .96, roughness: .22, clearcoat: 1, clearcoatRoughness: .2, envMapIntensity: 1.7 }));
  const darkMetal = material(new THREE.MeshStandardMaterial({ color: 0x1b2141, metalness: .85, roughness: .3, envMapIntensity: 2 }));
  const violet = material(new THREE.MeshPhysicalMaterial({ color: 0x7054db, metalness: .6, roughness: .18, clearcoat: 1, emissive: 0x302068, emissiveIntensity: .28, envMapIntensity: 1.5 }));
  const cyan = material(new THREE.MeshStandardMaterial({ color: 0x8cf5ff, emissive: 0x28c4ff, emissiveIntensity: 2.2, metalness: .25, roughness: .25 }));
  const purple = material(new THREE.MeshStandardMaterial({ color: 0xb39bff, emissive: 0x7850ff, emissiveIntensity: 1.8, metalness: .3, roughness: .3 }));
  const amber = material(new THREE.MeshStandardMaterial({ color: 0xffb978, emissive: 0xff7828, emissiveIntensity: .8, metalness: .5, roughness: .3 }));

  const segments = lowQuality ? 72 : 120;
  const ringGeometry = geometry(new THREE.TorusGeometry(1.88, .072, 12, segments));
  const inlayGeometry = geometry(new THREE.TorusGeometry(1.88, .017, 6, segments));
  const ringGroups = [];
  [silver, darkMetal, silver].forEach((surface, index) => {
    const ring = new THREE.Group();
    ring.rotation.set(.65 + index * .68, index * .75, -.4 + index * .8);
    ringGroups.push(ring);
    sculpture.add(ring);
    mesh(ringGeometry, surface, ring);
    const inlay = mesh(inlayGeometry, index === 1 ? purple : cyan, ring);
    inlay.position.z = .066;
    if (index === 0) {
      const nodeGeometry = geometry(new THREE.BoxGeometry(.15, .23, .16));
      for (let n = 0; n < 8; n++) {
        const angle = n / 8 * Math.PI * 2;
        const node = mesh(nodeGeometry, n % 2 ? silver : amber, ring);
        node.position.set(Math.cos(angle) * 1.88, Math.sin(angle) * 1.88, 0);
        node.rotation.z = angle;
      }
    }
  });
  const core = mesh(geometry(new THREE.IcosahedronGeometry(.85, 0)), violet);
  const coreOutline = new THREE.LineSegments(
    geometry(new THREE.EdgesGeometry(core.geometry)),
    material(new THREE.LineBasicMaterial({ color: 0xc8b5ff, transparent: true, opacity: .7 }))
  );
  core.add(coreOutline);
  const innerCore = mesh(geometry(new THREE.OctahedronGeometry(.31)), cyan);
  innerCore.position.y = 1.12;

  const satelliteGeometry = geometry(new THREE.OctahedronGeometry(.14));
  const satellites = [];
  for (let i = 0; i < 5; i++) {
    const item = mesh(satelliteGeometry, i % 2 ? silver : purple);
    const angle = i / 5 * Math.PI * 2;
    item.position.set(Math.cos(angle) * 2.45, Math.sin(angle) * 1.65, Math.sin(angle * 2) * .6);
    satellites.push(item);
  }

  const ambient = new THREE.HemisphereLight(0xb8c9ff, 0x100b25, 2);
  const key = new THREE.DirectionalLight(0xe7f4ff, 4);
  key.position.set(-3, 5, 4);
  key.castShadow = !lowQuality;
  key.shadow.mapSize.set(512, 512);
  key.shadow.camera.left = key.shadow.camera.bottom = -4;
  key.shadow.camera.right = key.shadow.camera.top = 4;
  key.shadow.normalBias = .025;
  key.shadow.bias = -.0003;
  const blueLight = new THREE.PointLight(0x329dff, 16, 12, 2);
  blueLight.position.set(-3, 1, 2);
  const purpleLight = new THREE.PointLight(0x9b4dff, 24, 12, 2);
  purpleLight.position.set(3, 1, -1);
  scene.add(ambient, key, blueLight, purpleLight);

  const floor = new THREE.Mesh(geometry(new THREE.CircleGeometry(3.3, 64)),
    material(new THREE.ShadowMaterial({ color: 0x08021d, opacity: .3 })));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -2.25;
  floor.receiveShadow = true;
  scene.add(floor);
  const platform = mesh(geometry(new THREE.TorusGeometry(2.25, .012, 6, 96)), purple, scene);
  platform.rotation.x = Math.PI / 2;
  platform.position.y = -2.2;

  // A soft sprite supplies inexpensive atmospheric glow instead of a full bloom pass.
  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = glowCanvas.height = 64;
  const context = glowCanvas.getContext('2d');
  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(133, 97, 255, .65)');
  gradient.addColorStop(.35, 'rgba(82, 90, 230, .2)');
  gradient.addColorStop(1, 'rgba(40, 80, 180, 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  const glowTexture = new THREE.CanvasTexture(glowCanvas);
  textures.add(glowTexture);
  const glow = new THREE.Sprite(material(new THREE.SpriteMaterial({ map: glowTexture, blending: THREE.AdditiveBlending, depthWrite: false, opacity: .55 })));
  glow.scale.set(5, 5, 1);
  glow.position.z = -1;
  scene.add(glow);

  const particleCount = lowQuality ? 75 : 180;
  const points = new Float32Array(particleCount * 3);
  // Deterministic positions make the composition stable across reloads.
  for (let i = 0; i < particleCount; i++) {
    const angle = i * 2.399963;
    const radius = 2.3 + (i % 23) / 23 * 2;
    points[i * 3] = Math.cos(angle) * radius;
    points[i * 3 + 1] = Math.sin(angle) * radius * .65;
    points[i * 3 + 2] = (i % 17) / 17 * 5 - 3;
  }
  const particleGeometry = geometry(new THREE.BufferGeometry());
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(points, 3));
  const particleMaterial = material(new THREE.PointsMaterial({ color: 0x9fbdff, size: .025, transparent: true, opacity: .65, depthWrite: false }));
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  let visible = true;
  let lost = false;
  let disposed = false;
  let frame = 0;
  let previous = 0;
  let lastRendered = 0;
  let elapsed = 0;
  let slowFrames = 0;
  let pointerX = 0;
  let pointerY = 0;
  let hover = false;
  const pointer = new THREE.Vector2(10, 10);
  const raycaster = new THREE.Raycaster();
  function render() {
    renderer.render(scene, camera);
  }
  function resize() {
    if (disposed || lost) return;
    const width = Math.max(1, viewport.clientWidth);
    const height = Math.max(1, viewport.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Fit the entire assembly even in a narrow phone viewport.
    camera.position.z = camera.aspect < 1.1 ? 11.4 : 9.7;
    camera.updateProjectionMatrix();
    camera.lookAt(0, -.1, 0);
    render();
  }
  function downgrade() {
    lowQuality = true;
    pixelRatio = 1;
    renderer.setPixelRatio(pixelRatio);
    renderer.shadowMap.enabled = false;
    particleGeometry.setDrawRange(0, 60);
    panel.dataset.graphics = 'economy';
    resize();
  }
  function tick(timestamp) {
    frame = 0;
    if (disposed || lost || !visible || document.hidden || stopped()) return;
    frame = window.requestAnimationFrame(tick);
    const interval = previous ? timestamp - previous : 16.7;
    previous = timestamp;
    if (!lowQuality) {
      slowFrames = interval > 28 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
      if (slowFrames >= 45) downgrade();
    }
    // Economy mode limits GPU work to 30 FPS; capable devices follow display refresh.
    if (lowQuality && timestamp - lastRendered < 32) return;
    const delta = lastRendered ? Math.min((timestamp - lastRendered) / 1000, .05) : .016;
    lastRendered = timestamp;
    elapsed += delta;
    const easing = 1 - Math.exp(-delta * 4);
    sculpture.rotation.x += (pointerY * .17 - sculpture.rotation.x) * easing;
    sculpture.rotation.y += (pointerX * .3 + Math.sin(elapsed * .14) * .15 - sculpture.rotation.y) * easing;
    sculpture.position.y = Math.sin(elapsed * .7) * .12;
    ringGroups[0].rotation.z = -.4 + elapsed * .13;
    ringGroups[1].rotation.y = .75 + elapsed * .16;
    ringGroups[2].rotation.x = 2.01 + Math.sin(elapsed * .25) * .35;
    core.rotation.set(elapsed * .14, elapsed * .2, .2);
    innerCore.rotation.y = -elapsed * .7;
    satellites.forEach((item, index) => {
      item.rotation.x = elapsed * .25 + index;
      item.rotation.y = elapsed * .3;
    });
    particles.rotation.y = elapsed * .025;
    particles.rotation.z = Math.sin(elapsed * .08) * .04;
    camera.position.x += (pointerX * .18 - camera.position.x) * easing;
    camera.position.y += (1 - pointerY * .14 - camera.position.y) * easing;
    camera.lookAt(0, -.1, 0);
    raycaster.setFromCamera(pointer, camera);
    const overCore = raycaster.intersectObject(core, false).length > 0;
    const intensity = hover && overCore ? .85 : .28;
    violet.emissiveIntensity += (intensity - violet.emissiveIntensity) * easing;
    purpleLight.intensity += ((hover ? 36 : 24) - purpleLight.intensity) * easing;
    glow.material.opacity += ((hover ? .8 : .55) - glow.material.opacity) * easing;
    render();
  }
  function synchronize() {
    window.cancelAnimationFrame(frame);
    frame = 0;
    previous = lastRendered = 0;
    if (disposed || lost || !visible || document.hidden) return;
    render();
    if (!stopped()) frame = window.requestAnimationFrame(tick);
  }
  viewport.addEventListener('pointermove', (event) => {
    if (stopped() || !finePointer.matches || event.pointerType === 'touch') return;
    const rect = viewport.getBoundingClientRect();
    pointerX = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
    pointerY = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
    pointer.set(pointerX, -pointerY);
    hover = true;
  });
  function resetPointer() { pointerX = pointerY = 0; hover = false; pointer.set(10, 10); }
  viewport.addEventListener('pointerleave', resetPointer);
  finePointer.addEventListener('change', resetPointer);
  document.addEventListener('portfolio:motionchange', () => { resetPointer(); synchronize(); });
  document.addEventListener('visibilitychange', synchronize);
  function theme() {
    const light = document.documentElement.dataset.theme === 'light';
    silver.color.setHex(light ? 0x8f9fbb : 0xb6c8e8);
    ambient.intensity = light ? 2.6 : 2;
    particleMaterial.color.setHex(light ? 0x5d51a0 : 0x9fbdff);
    glow.visible = !light;
    render();
  }
  document.addEventListener('portfolio:themechange', theme);
  const resizer = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
  if (resizer) resizer.observe(viewport);
  else window.addEventListener('resize', resize);
  const visibility = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    synchronize();
  }) : null;
  if (visibility) visibility.observe(panel);
  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    lost = true;
    window.cancelAnimationFrame(frame);
    panel.classList.remove('is-rendered');
  });
  canvas.addEventListener('webglcontextrestored', () => {
    lost = false;
    resize();
    panel.classList.add('is-rendered');
    synchronize();
  });
  window.addEventListener('pagehide', (event) => {
    if (event.persisted) return;
    disposed = true;
    window.cancelAnimationFrame(frame);
    if (resizer) resizer.disconnect();
    if (visibility) visibility.disconnect();
    geometries.forEach((item) => item.dispose());
    materials.forEach((item) => item.dispose());
    textures.forEach((item) => item.dispose());
    environment.dispose();
    renderer.dispose();
  });
  window.addEventListener('pageshow', synchronize);
  theme();
  resize();
  panel.classList.add('is-rendered');
  panel.querySelector('.scene-hint').textContent = 'Decorative study / Move your pointer';
  synchronize();
}
