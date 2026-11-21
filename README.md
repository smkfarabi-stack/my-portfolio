# SMK Farabi — Research-focused Portfolio

A responsive, static portfolio designed around a chemistry undergraduate profile and research direction. The visual system uses white, black, red and orange with editorial typography, glassmorphism surfaces, restrained motion and scientific-inspired graphical details.

## Open locally

Open `index.html` in a browser. No build step, package manager or server is required.

## Main sections

- **Overview:** profile introduction, portrait, contact links and CV download.
- **Profile:** academic status, university and long-term academic goal.
- **Research direction:** organic synthesis, medicinal chemistry and computer-aided drug design.
- **Selected coursework:** compact, expandable Part I–IV course archive directly after the research direction section, with search and year filters.
- **Toolkit:** bold, high-contrast skill chips for PyMOL, Avogadro, DataWarrior, Python, JavaScript and other CV-listed skills.
- **Projects:** CV-selected technical projects with filtering and search.
- **Academic community:** ACS International Student Chapter, JUSC, National Science Fest and EEC JU.
- **Research output:** reserved for verified papers and academic contributions; no publications are fabricated.

## Update the portfolio

### Edit projects
Open `js/projects.js` and add an object to the `projects` array. Fields include:

- `name`, `description`
- `link` (live project URL; use an empty string if unavailable)
- `code` (source URL; use an empty string if unavailable)
- `tech` (array of tags)
- `icon` (Boxicons class)
- `category` (`communication`, `web` or `systems`)
- `kind` (small category label)

The homepage and `projects.html` render from this file. Search and category filters are built in.

### Add a research output
Open `js/publications.js` and add only a verified item with `name`, `type`, `year`, `venue`, `description` and `link`. The research archive explains that the supplied CV does not currently list publication records.

### Update the CV
Replace `assets/SMK-Farabi-CV.pdf` with the updated PDF, keeping the same filename so the download links continue to work.

### Replace portrait images
- `assets/images/pic1.jpg` — homepage portrait.
- `assets/images/pic2.jpg` — retained original secondary image for future use.

## Included interactions

- Responsive mobile navigation with accessible expanded state.
- Scroll reading-progress bar and active section navigation.
- Intersection-based reveal motion, with reduced-motion support.
- Glassmorphism navigation, skill cards, profile panels and coursework cards.
- Compact expandable coursework groups, search and Part I–IV filters with live result counts.
- Rotating research keywords.
- Project category filtering and live text search.
- Copy-email control and mailto contact form (no backend or message storage).
- Downloadable CV PDF.

## Deployment

This is a static website and can be deployed to GitHub Pages, Cloudflare Pages, Netlify or any static hosting service. Keep the folder structure intact when uploading.
