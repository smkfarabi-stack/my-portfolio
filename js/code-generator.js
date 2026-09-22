const form = document.querySelector('#generator-form');
const contentType = document.querySelector('#content-type');
const typeButtons = document.querySelectorAll('.type-btn');
const projectOnly = document.querySelectorAll('.project-only');
const publicationOnly = document.querySelectorAll('.publication-only');
const output = document.querySelector('#code-output code');
const outputTitle = document.querySelector('#output-title');
const pasteHelp = document.querySelector('#paste-help');
const copyButton = document.querySelector('#copy-code');

function setMode(mode) {
  contentType.value = mode;
  typeButtons.forEach(button => button.classList.toggle('active', button.dataset.type === mode));
  projectOnly.forEach(el => el.classList.toggle('hidden-fields', mode !== 'project'));
  publicationOnly.forEach(el => el.classList.toggle('hidden-fields', mode !== 'publication'));
  document.querySelector('#link').placeholder = mode === 'project' ? 'https://live-project-link...' : 'https://doi.org/... or https://...';
  outputTitle.textContent = mode === 'project' ? 'Project object' : 'Publication object';
  pasteHelp.innerHTML = mode === 'project'
    ? '<strong>Paste location:</strong> <code>js/projects.js</code> → inside the <code>projects</code> array.'
    : '<strong>Paste location:</strong> <code>js/publications.js</code> → inside the <code>publications</code> array.';
}

typeButtons.forEach(button => button.addEventListener('click', () => setMode(button.dataset.type)));

function jsString(value) {
  return JSON.stringify(value ?? '');
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const mode = contentType.value;
  const name = document.querySelector('#name').value.trim();
  const description = document.querySelector('#description').value.trim();
  const link = document.querySelector('#link').value.trim();

  let object;
  if (mode === 'project') {
    object = [
      '  {',
      `    name: ${jsString(name)},`,
      `    description: ${jsString(description)},`,
      `    link: ${jsString(link)},`,
      `    code: ${jsString(document.querySelector('#code').value.trim())},`,
      `    tech: [${document.querySelector('#tech').value.split(',').map(v => v.trim()).filter(Boolean).map(jsString).join(', ')}],`,
      `    icon: ${jsString(document.querySelector('#icon').value.trim() || 'bx bx-flask')},`,
      `    featured: ${document.querySelector('#featured').checked}`,
      '  }'
    ].join('\n');
  } else {
    object = [
      '  {',
      `    name: ${jsString(name)},`,
      `    type: ${jsString(document.querySelector('#type').value)},`,
      `    year: ${jsString(document.querySelector('#year').value.trim())},`,
      `    venue: ${jsString(document.querySelector('#venue').value.trim())},`,
      `    description: ${jsString(description)},`,
      `    link: ${jsString(link)}`,
      '  }'
    ].join('\n');
  }
  output.textContent = object;
});

copyButton.addEventListener('click', async () => {
  const code = output.textContent;
  if (!code || code.startsWith('// Your generated')) return;
  try {
    await navigator.clipboard.writeText(code);
    copyButton.innerHTML = '<i class="bx bx-check"></i> Copied';
    setTimeout(() => { copyButton.innerHTML = '<i class="bx bx-copy"></i> Copy'; }, 1500);
  } catch {
    copyButton.innerHTML = '<i class="bx bx-error"></i> Select & Copy';
  }
});

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
}), { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const menuButton = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
if (menuButton && navbar) {
  menuButton.addEventListener('click', () => {
    navbar.classList.toggle('active');
    const icon = menuButton.querySelector('i');
    if (icon) icon.className = navbar.classList.contains('active') ? 'bx bx-x' : 'bx bx-menu';
  });
}
