# SMK Farabi Portfolio — Glass Chemistry Edition

A static portfolio redesign using a chemistry-inspired glassmorphism visual system, animated molecule/orbit motifs, responsive layouts, and data-driven Project + Published Papers & Related pages.

## Structure

```text
my-portfolio-upgraded/
├── index.html                 # Main portfolio landing page
├── projects.html              # Full projects archive
├── publications.html          # Published Papers & Related archive
├── codegenerator.html         # Generates paste-ready data objects
├── assets/
│   └── images/
│       ├── pic1.jpg           # Hero image
│       └── pic2.jpg           # About/research image
├── css/
│   ├── style.css              # Main design system + responsive UI
│   └── code-generator.css     # Generator page styles
└── js/
    ├── app.js                 # Navigation, rendering, reveal animations
    ├── projects.js            # EDIT THIS to add projects
    ├── publications.js        # EDIT THIS to add papers/research
    └── code-generator.js      # Generator logic
```

## Add a Project

1. Open `codegenerator.html`.
2. Select **Project**.
3. Fill in the project name, live link, code/GitHub link, technologies, and icon.
4. Click **Generate Code**.
5. Click **Copy**.
6. Open `js/projects.js`.
7. Paste the generated object inside the `projects` array, after the previous object.
8. Save and refresh `projects.html` or the home page.

You can also add objects manually using the same fields.

## Add a Paper / Research Item

1. Open `codegenerator.html`.
2. Select **Paper & Related**.
3. Fill in the title, type, year, venue, description, and link.
4. Generate + copy.
5. Paste the object inside the `publications` array in `js/publications.js`.

Supported types include Paper, Preprint, Poster, Conference, Thesis, and Related.

## Images

The website references exactly two image files:

- `assets/images/pic1.jpg`
- `assets/images/pic2.jpg`

Replace these files with your preferred two photos without changing the HTML.

## Design Features

- Dark chemistry-inspired palette with aqua/teal + violet accents.
- Glassmorphism panels with layered blur, borders, and depth.
- Animated molecule diagrams, orbit rings, electrons, floating formulas, and scanline effects.
- Scroll-triggered reveal transitions using native `IntersectionObserver`.
- Hover lift/depth effects for cards and buttons.
- Responsive navigation and card layouts.
- Reduced-motion support for accessibility.
- No ScrollReveal or Typed.js dependency required.

## Personalization

Most visible content can be changed directly in `index.html`. Dynamic project and publication content belongs in the two dedicated JS files so the homepage remains easy to maintain.
