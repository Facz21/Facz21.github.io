# FACZ Portfolio — Draft

This repository is a working draft of a personal portfolio website built with plain HTML, CSS and vanilla JavaScript. It demonstrates a small collection of visual ideas (glassmorphism, parallax starfield) and a responsive gallery view.

Table of Contents
-----------------
- Project overview
- Features
- Project structure
- Local setup
- Customization & performance tips
- Accessibility notes
- Contributing
- Author & license

Project overview
----------------
The site is a static portfolio prototype intended to be served as static files (GitHub Pages, Netlify, local static server). It focuses on visual presentation and small interactive components rather than backend functionality.

Key Features
------------
- Parallax starfield background drawn on a `<canvas>` (`js/parallax-stars.js`).
- Glassmorphism UI for header, sections and cards using translucent backgrounds and `backdrop-filter`.
- Responsive navigation including a hamburger menu for small screens.
- A dedicated pets/gallery view (`views/mascotas.html`) with a responsive grid and a lightbox modal.
- Small, focused JavaScript utilities in `js/` for interactive behavior.

Project structure (important files)
----------------------------------
- `index.html` — main landing page.
- `views/mascotas.html` — pets/gallery page.
- `css/` — modular styles: `main.css`, `header.css`, `mascotas.css`, `responsive.css`, etc.
- `js/parallax-stars.js` — canvas starfield and parallax logic.
- `js/mascotas-modal.js` — gallery lightbox modal behavior.
- `assets/images/` — example images used on the gallery.

Local setup
-----------
1. Open `index.html` or `views/mascotas.html` directly in your browser (works for most browsers).
2. For a better local development experience run a static server from the project root, for example:

```bash
# using npx http-server (Node.js)
npx http-server -c-1 .

# or Python 3 built-in server
python -m http.server 5500
```

Then open `http://localhost:5500/` (or the port shown by the server) and navigate to the pages.

Customization & performance tips
--------------------------------
- Change images: replace files under `assets/images/` and update paths in `views/mascotas.html`.
- Starfield density: edit `js/parallax-stars.js` layers' `count` values to reduce CPU/GPU load on mobile — e.g., lower counts for smaller screens.
- Reduce motion for accessibility: respect `prefers-reduced-motion` by disabling the animation loop or limiting movement when the media query is set.
- Use optimized image formats (WebP/AVIF) and proper `loading="lazy"` (already in use) to reduce load time.

Accessibility notes
-------------------
- The gallery lightbox supports keyboard closing (Escape) and returns focus to the previously focused element after closing. Consider adding focus trapping inside the dialog for full keyboard navigation.
- Use semantic HTML for content and provide `alt` attributes for images (already included in the gallery).

Contributing
------------
This is a personal draft — contributions are welcome if you want to experiment with improvements. Typical tasks:
- Improve accessibility (focus management, ARIA attributes)
- Optimize performance (image sizes, canvas throttling)
- Add unit tests or CI if converting into a larger project

Author & License
----------------
Author: Andrés Felipe Cortés Zambrano

License: This repository is a personal project draft. Add a license file (e.g., `LICENSE`) if you want to publish under a specific license.

Notes / Next steps
------------------
- Consider adding a short deployment guide for GitHub Pages or Netlify.
- If you want, I can add a small `package.json` with development scripts (serve, lint, format) or set up a CI workflow for automatic deploys.

