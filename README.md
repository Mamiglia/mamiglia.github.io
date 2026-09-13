# mamiglia.github.io

Personal site of Matteo Migliarini, built with Vue 3, Vite and TypeScript. Deployed to GitHub Pages from the `vue-main` branch by `.github/workflows/deploy.yaml`.

## Where the content lives

All text content is loaded at runtime from `public/docs/`, so most updates need no code change:

| File | Page |
| --- | --- |
| `public/docs/bio.md` | Bio |
| `public/docs/projects.yaml` | Projects (open source, side projects). Each entry needs a `year`; the page sorts newest first. |
| `public/docs/publications.yaml` | Publications, sorted by year. Authors are one comma-separated string; `*` marks equal contribution. Entries with `featured: true` also appear as cards on the Projects page. |
| `public/docs/teachings.yaml` | Teachings |

Project images go in `public/project_images/` and are referenced by file name in the YAML (`image: name.jpg`). Links are auto-iconed: GitHub URLs get a git icon, arXiv URLs a paper icon, everything else a link icon.

Site-wide metadata (description, Open Graph tags, JSON-LD) is in `index.html`. A plain-text summary for crawlers and LLMs is in `public/llms.txt`.

The face that follows the cursor is `src/components/FaceLooker.vue`, driven by the pre-rendered frames in `public/faces/`.

## Development

Requires [Bun](https://bun.sh). The type check also needs Node on the PATH, because vue-tsc cannot resolve `.vue` modules when Bun runs it in place of Node. On NixOS: `nix shell nixpkgs#bun nixpkgs#nodejs_22`.

```sh
bun install
bun run dev         # http://localhost:5173
bun run build       # production build in dist/
bun run type-check  # vue-tsc, runs in CI before the build
```
