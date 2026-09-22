const menuButton = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');

if (menuButton && navbar) {
  menuButton.addEventListener('click', () => {
    navbar.classList.toggle('active');
    const icon = menuButton.querySelector('i');
    if (icon) icon.className = navbar.classList.contains('active') ? 'bx bx-x' : 'bx bx-menu';
  });

  navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      const icon = menuButton.querySelector('i');
      if (icon) icon.className = 'bx bx-menu';
    });
  });
}

window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 24);
});

function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function projectCard(project) {
  const tags = (project.tech || []).map(tag => `<span>${escapeHTML(tag)}</span>`).join('');
  const liveButton = project.link ? `<a class="card-link" href="${escapeHTML(project.link)}" target="_blank" rel="noopener">Open Project <i class="bx bx-link-external"></i></a>` : '';
  const codeButton = project.code ? `<a class="card-link secondary" href="${escapeHTML(project.code)}" target="_blank" rel="noopener">Source Code <i class="bx bx-github"></i></a>` : '';
  return `<article class="project-card glass-card reveal"><div class="project-icon"><i class="${escapeHTML(project.icon || 'bx bx-flask')}"></i></div><div class="project-index">PROJECT</div><h3>${escapeHTML(project.name)}</h3><p>${escapeHTML(project.description)}</p><div class="tag-list small">${tags}</div><div class="card-actions">${liveButton}${codeButton}</div></article>`;
}

function publicationCard(item, full = false) {
  const meta = [item.type, item.year, item.venue].filter(Boolean).map(escapeHTML);
  return `<article class="publication-card glass-card reveal"><div class="pub-mark"><i class="bx bx-file"></i></div><div class="pub-main"><div class="pub-meta">${meta.join(' · ') || 'Research / Related'}</div><h3>${escapeHTML(item.name)}</h3>${item.description ? `<p>${escapeHTML(item.description)}</p>` : ''}<a class="text-link" href="${escapeHTML(item.link)}" target="_blank" rel="noopener">Open link <i class="bx bx-up-arrow-alt bx-rotate-45"></i></a></div></article>`;
}

const projectPreview = document.querySelector('#project-preview');
const allProjects = document.querySelector('#all-projects');
if (typeof projects !== 'undefined') {
  const featured = projects.filter(p => p.featured);
  if (projectPreview) projectPreview.innerHTML = (featured.length ? featured : projects).slice(0, 3).map(projectCard).join('');
  if (allProjects) allProjects.innerHTML = projects.map(projectCard).join('');
}

const publicationPreview = document.querySelector('#publication-preview');
const allPublications = document.querySelector('#all-publications');
if (typeof publications !== 'undefined') {
  if (publications.length) {
    if (publicationPreview) publicationPreview.innerHTML = publications.slice(0, 4).map(item => publicationCard(item)).join('');
    if (allPublications) allPublications.innerHTML = publications.map(item => publicationCard(item, true)).join('');
  } else {
    const empty = `<div class="empty-state glass-card"><i class="bx bx-flask"></i><h3>No publications added yet</h3><p>Research papers, posters, preprints, conference work, and related scientific material will appear here.</p></div>`;
    if (publicationPreview) publicationPreview.innerHTML = empty;
    if (allPublications) allPublications.innerHTML = empty;
  }
}

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sectionLinks = [...document.querySelectorAll('.navbar a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];
if (sectionLinks.length && sections.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sectionLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => sectionObserver.observe(section));
}
