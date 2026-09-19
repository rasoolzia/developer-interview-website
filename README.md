# Developer Interview Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A fast, multilingual (English / Persian) developer interview questions website — built with Next.js, React Server Components, and Feature-Sliced Design.

The site is a pure presentation layer. It consumes a generated, static JSON API produced by the companion content repository and is responsible only for fetching, caching, searching, filtering, and rendering that data — it never parses or authors content itself.

**Live website:** https://interview.mrzd.ir
**Content source:** [developer-interview-handbook](https://github.com/rasoolzia/developer-interview-handbook)

---

## Features

- Full-text search with cascading, URL-synced filters (domain → topic → difficulty → category)
- Server-rendered results with `page`, `q`, and filter state fully reflected in the URL — shareable, bookmarkable, back-button friendly
- English and Persian (RTL) support via `next-intl`, including locale-aware routing and logical CSS properties
- Light/dark theme with flash-free hydration
- Feature-Sliced Design architecture with strict, one-directional layer dependencies
- Server Components by default; Client Components only where interactivity is required
- No backend of its own — the entire content layer is a static, CDN-friendly JSON API

---

## Tech Stack

| Concern              | Choice                                           |
| -------------------- | ------------------------------------------------ |
| Framework            | Next.js 16 (App Router, React Server Components) |
| UI library           | React 19                                         |
| Language             | TypeScript                                       |
| Styling              | Tailwind CSS v4                                  |
| Components           | shadcn/ui + base-ui                              |
| Internationalization | next-intl (English / Persian, RTL)               |
| Theming              | @teispace/next-themes                            |
| Schema validation    | Zod                                              |
| Architecture         | Feature-Sliced Design (FSD)                      |
| Package manager      | pnpm                                             |

See [`docs/dependencies.md`](./docs/dependencies.md) for the reasoning behind each architectural dependency.

---

## Quick Start

### Prerequisites

- Node.js (see [`.nvmrc`](./.nvmrc) for the exact version)
- pnpm

### Installation

```bash
git clone https://github.com/rasoolzia/developer-interview-website.git
cd developer-interview-website

pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Scripts

```bash
pnpm dev            # Start the dev server
pnpm build           # Production build
pnpm start           # Start the production server
pnpm lint            # Lint the project
pnpm lint:fix         # Lint and auto-fix
pnpm format           # Format with Prettier
pnpm format:check      # Check formatting without writing
pnpm typecheck         # Run TypeScript with no emit
```

Husky + lint-staged run linting and formatting automatically on commit; commitlint enforces [Conventional Commits](https://www.conventionalcommits.org/) on commit messages.

---

## Architecture

This project follows **Feature-Sliced Design**, with a strict one-directional dependency rule:

```
app → views → widgets → features → entities → shared
```

Higher layers may depend on lower layers; lower layers must never depend on higher ones. Each layer is exposed through a public `index.ts`, and cross-layer imports go through that public API rather than reaching into internal files directly.

| Layer      | Responsibility                                                  |
| ---------- | --------------------------------------------------------------- |
| `app`      | Routing, layouts, providers, global styles                      |
| `views`    | Full pages — one view per route                                 |
| `widgets`  | Large, composed page sections (header, footer, sidebar)         |
| `features` | User-facing actions (search, filters, theme/language switching) |
| `entities` | Business/domain models (question, search, topic, domain)        |
| `shared`   | Framework-agnostic, business-agnostic reusable code             |

Full details, rationale, and rules live in [`docs/`](./docs):

- [`architecture.md`](./docs/architecture.md) — why FSD, why Server Components, why a static JSON API
- [`folder-structure.md`](./docs/folder-structure.md) — what belongs in each layer
- [`layer-rules.md`](./docs/layer-rules.md) — the dependency rules and why they matter
- [`public-api.md`](./docs/public-api.md) — the JSON contract this site consumes from the content repository
- [`coding-standards.md`](./docs/coding-standards.md) — naming and structural conventions
- [`project-decisions.md`](./docs/project-decisions.md) — running log of tooling and architectural decisions
- [`roadmap.md`](./docs/roadmap.md) — what's shipped and what's next

---

## Data Flow

```
developer-interview-handbook (content repo)
        │  Markdown → validated → generated
        ▼
public/api/*.json  (manifest, search-index, per-topic files)
        │
        ▼
shared/api  (fetch client + Zod schemas)
        │
        ▼
entities/*  (typed domain models: Question, SearchItem, ...)
        │
        ▼
views/*  (server-rendered pages, e.g. /search)
```

Content is never authored or parsed in this repository — it's entirely owned by the [handbook repo](https://github.com/rasoolzia/developer-interview-handbook), which is the single source of truth. This project's job starts at "fetch the generated JSON" and ends at "render it well."

---

## Caching

Generated JSON is cached in server memory after its first successful request. A page can reuse the manifest, search index, and topic files without another API download while the current Next.js server process is alive. Failed requests are not cached and can be retried.

Repositories only fetch JSON. Services decide which cache key applies. See [the cache guide](docs/caching.md) before adding a new API resource.

---

## Internationalization

The site supports English (`en`) and Persian (`fa`), with `fa` rendered right-to-left. Locale-aware routing, navigation, and `<html lang / dir>` attributes are handled via `next-intl` (`shared/config/i18n`). UI code uses logical CSS properties (`ps-*`, `pe-*`, `border-s-*`, etc.) rather than physical `left`/`right`, so components render correctly in both directions without per-locale overrides.

---

## Contributing

Contributions are welcome — whether that's a bug fix, a UI improvement, or a new feature.

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Verify before committing:
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm format:check
   ```
5. Commit using [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `refactor:`, ...)
6. Push and open a Pull Request

Please read [`docs/layer-rules.md`](./docs/layer-rules.md) and [`docs/coding-standards.md`](./docs/coding-standards.md) before making structural changes — FSD's value depends on the dependency direction being respected consistently.

Looking to contribute content instead (questions, answers, translations)? That happens in the [developer-interview-handbook](https://github.com/rasoolzia/developer-interview-handbook) repo, not here.

---

## License

MIT — see [LICENSE](./LICENSE).
