# Roadmap

## Shipped

- Landing page (hero, domains, stats, open-source, search, CTA sections)
- Theme switcher (light / dark, flash-free hydration)
- Language switcher (English / Persian, RTL)
- Search page:
  - Server-rendered results with `query`, `domain`, `topic`, `difficulty`, `category`, `language`, `page` fully synced to the URL
  - Cascading facet filters (domain → topic → difficulty → category), computed dynamically from the fetched dataset
  - Desktop sidebar + mobile sheet filter panel
  - URL-synced pagination
  - Non-blocking filter/pagination transitions (dim + spinner instead of full-page reload feel)
  - Route-level loading skeleton matching the real two-column layout
  - Shared `QuestionCard` component, decoupled from its data source via `QuestionBase`

## In Progress / Next Up

- **Topic list page** (`views/topic`) — list all questions for a single domain/topic, reusing `QuestionCard` via the `Question` → `QuestionCardItem` mapping already in place
- **Question detail page** (`views/question`) — full question + answer markdown rendering
- **Widgets currently scaffolded but empty**: `sidebar`, `topic-grid`, `question-list`, `search-panel`, `breadcrumbs`

## Planned

- **Bookmark feature** (`features/bookmark`) — save questions locally, no backend required
- **Share feature** (`features/share`) — share a question or a filtered search URL
- **Copy-link feature** (`features/copy-link`)
- Domain overview pages (`views/domain`)
- Expanded topic label list (`entities/question/lib/get-topic-label.ts`) as new domains/topics are added upstream
- `public-api.md` kept in sync as the content API surface evolves

## Later / Exploratory

- Persisted user preferences (bookmarks, recently viewed) beyond local storage
- Automated visual/accessibility regression checks in CI
- Expanded cross-language consistency checks surfaced in the UI (e.g. "this topic has fewer Persian questions than English")

This roadmap tracks the website only. Content coverage, new domains/topics, and translation work happen in the [developer-interview-handbook](https://github.com/rasoolzia/developer-interview-handbook) repo and follow its own roadmap.
