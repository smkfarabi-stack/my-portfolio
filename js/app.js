(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const header = $('.header');
  const menuButton = $('#menu-icon');
  const navbar = $('.navbar');
  const progressBar = $('#scroll-progress-bar');
  const toast = $('#toast');

  // Mobile navigation
  if (menuButton && navbar) {
    menuButton.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      const icon = $('i', menuButton);
      if (icon) icon.className = isOpen ? 'bx bx-x' : 'bx bx-menu';
    });
    $$('.navbar a').forEach(link => link.addEventListener('click', () => {
      navbar.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      const icon = $('i', menuButton);
      if (icon) icon.className = 'bx bx-menu';
    }));
  }

  // Scroll state and reading progress
  let scrollTicking = false;
  const updateScroll = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
    scrollTicking = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScroll);
      scrollTicking = true;
    }
  }, { passive: true });
  updateScroll();

  // Scroll reveal: graceful fallback for browsers without IntersectionObserver
  const revealItems = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Active navigation state
  const navLinks = $$('.navbar a[href^="#"]');
  const observedSections = navLinks.map(link => $(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && observedSections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    observedSections.forEach(section => sectionObserver.observe(section));
  }

  // Small rotating research keywords
  const rotatingWord = $('#rotating-word');
  const words = ['molecules', 'new reactions', 'drug design', 'chemical data'];
  if (rotatingWord && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let wordIndex = 0;
    window.setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      rotatingWord.classList.add('word-out');
      window.setTimeout(() => {
        rotatingWord.textContent = words[wordIndex];
        rotatingWord.classList.remove('word-out');
      }, 220);
    }, 2600);
  }

  // Project cards, archive, search and category filters
  const projectContainers = [$('#project-preview'), $('#all-projects')].filter(Boolean);
  const searchInput = $('#project-search');
  const filterButtons = $$('.filter-btn');
  let activeFilter = 'all';
  let searchTerm = '';

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const renderProject = project => {
    const tags = (project.tech || []).map(tag => `<span>${escapeHTML(tag)}</span>`).join('');
    const links = [
      project.link ? `<a href="${escapeHTML(project.link)}" target="_blank" rel="noopener noreferrer">Open project <i class="bx bx-up-right-arrow-alt"></i></a>` : '',
      project.code && project.code !== project.link ? `<a href="${escapeHTML(project.code)}" target="_blank" rel="noopener noreferrer">Source code <i class="bx bx-code-alt"></i></a>` : ''
    ].filter(Boolean).join('');
    return `<article class="project-card" data-category="${escapeHTML(project.category || 'other')}" data-search="${escapeHTML(`${project.name} ${project.description} ${(project.tech || []).join(' ')}`.toLowerCase())}">
      <div class="project-card-top"><span class="project-kind">${escapeHTML(project.kind || 'SELECTED PROJECT')}</span><span class="project-icon"><i class="${escapeHTML(project.icon || 'bx bx-flask')}"></i></span></div>
      <h3>${escapeHTML(project.name)}</h3><p>${escapeHTML(project.description)}</p><div class="project-tags">${tags}</div>
      <div class="project-links">${links || '<span class="project-kind">DETAILS IN CV</span>'}</div></article>`;
  };

  projectContainers.forEach(container => {
    if (typeof projects !== 'undefined') container.innerHTML = projects.map(renderProject).join('');
  });

  const applyProjectFilters = () => {
    const allCards = $$('.project-card');
    let visibleCount = 0;
    allCards.forEach(card => {
      const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
      const matchesSearch = !searchTerm || (card.dataset.search || '').includes(searchTerm);
      const visible = matchesCategory && matchesSearch;
      card.classList.toggle('is-hidden', !visible);
      if (visible) visibleCount++;
    });
    const count = $('#project-result-count');
    if (count) count.textContent = `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'} shown`;
    const archiveCount = $('#archive-result-count');
    if (archiveCount) archiveCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'result' : 'results'}`;
    const empty = $('#project-empty-state');
    if (empty) empty.hidden = visibleCount !== 0;
  };
  filterButtons.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    applyProjectFilters();
  }));
  if (searchInput) searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value.trim().toLowerCase();
    applyProjectFilters();
  });
  applyProjectFilters();


  // Selected coursework archive: year filters and live search.
  const courseCards = $$('.course-card');
  const courseFilterButtons = $$('.course-filter-btn');
  const courseSearchInput = $('#course-search');
  const courseGroups = $$('[data-course-group]');
  const courseEmptyState = $('#course-empty-state');
  const courseResultCount = $('#course-result-count');
  const courseResultLabel = $('#course-result-label');
  let activeCourseYear = 'all';
  let courseSearchTerm = '';

  const applyCourseFilters = () => {
    let visibleCount = 0;
    courseCards.forEach(card => {
      const matchesYear = activeCourseYear === 'all' || card.dataset.courseYear === activeCourseYear;
      const matchesSearch = !courseSearchTerm || (card.dataset.search || card.textContent.toLowerCase()).toLowerCase().includes(courseSearchTerm);
      const visible = matchesYear && matchesSearch;
      card.classList.toggle('is-hidden', !visible);
      if (visible) visibleCount += 1;
    });
    courseGroups.forEach(group => {
      const hasVisible = $$('.course-card:not(.is-hidden)', group).length > 0;
      group.hidden = !hasVisible;
      // Keep the archive compact by default; expand matching groups during filtering/search.
      if (courseSearchTerm || activeCourseYear !== 'all') {
        group.open = hasVisible;
      } else {
        group.open = group.dataset.courseGroup === '3';
      }
    });
    if (courseResultCount) courseResultCount.textContent = String(visibleCount);
    if (courseResultLabel) {
      const yearLabel = activeCourseYear === 'all' ? 'all academic years' : `Part ${['I', 'II', 'III', 'IV'][Number(activeCourseYear) - 1]}`;
      courseResultLabel.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'course' : 'courses'} · ${yearLabel}`;
    }
    if (courseEmptyState) courseEmptyState.hidden = visibleCount !== 0;
  };

  courseFilterButtons.forEach(button => button.addEventListener('click', () => {
    activeCourseYear = button.dataset.courseFilter || 'all';
    courseFilterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    applyCourseFilters();
  }));
  if (courseSearchInput) courseSearchInput.addEventListener('input', () => {
    courseSearchTerm = courseSearchInput.value.trim().toLowerCase();
    applyCourseFilters();
  });
  if (courseCards.length) applyCourseFilters();

  // Publication archive renderer: only verified entries supplied in publications.js are shown.
  const publicationContainers = [$('#publication-preview'), $('#all-publications')].filter(Boolean);
  const renderPublication = item => {
    const meta = [item.type, item.year, item.venue].filter(Boolean).map(escapeHTML).join(' · ');
    return `<article class="publication-card"><div class="pub-mark"><i class="bx bx-file"></i></div><div><div class="pub-meta">${meta || 'RESEARCH OUTPUT'}</div><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.description || '')}</p>${item.link ? `<a class="text-link" href="${escapeHTML(item.link)}" target="_blank" rel="noopener noreferrer">Open source <i class="bx bx-up-right-alt"></i></a>` : ''}</div></article>`;
  };
  publicationContainers.forEach(container => {
    const items = typeof publications !== 'undefined' ? publications : [];
    if (items.length) container.innerHTML = items.map(renderPublication).join('');
    else if (container.id === 'all-publications') container.innerHTML = `<div class="empty-state"><i class="bx bx-book-open"></i><h3>No research outputs listed yet</h3><p>The supplied CV describes research interests but does not list papers, preprints or conference publications. This archive is ready for verified work to be added when available.</p></div>`;
  });

  // Clipboard helper and small accessible toast
  let toastTimer;
  const showToast = message => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2300);
  };
  const copyEmailButton = $('#copy-email');
  if (copyEmailButton) copyEmailButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('smkfarabi@gmail.com');
      showToast('Email address copied.');
    } catch {
      showToast('Please copy: smkfarabi@gmail.com');
    }
  });

  // Contact form uses the visitor's default mail application (no backend implied).
  const contactForm = $('#contact-form');
  if (contactForm) contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:smkfarabi@gmail.com?subject=${subject}&body=${body}`;
  });

  const year = $('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
