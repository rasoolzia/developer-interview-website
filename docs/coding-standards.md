# Coding Standards

## Naming Conventions

| What                       | Convention                    | Example                                  |
| -------------------------- | ----------------------------- | ---------------------------------------- |
| Files & folders            | kebab-case                    | `search-view.tsx`, `to-question-card.ts` |
| React components           | PascalCase (export name)      | `export function QuestionCard() {}`      |
| Hooks                      | camelCase, `use` prefix       | `useMounted`, `useQueryState`            |
| Types & interfaces         | PascalCase                    | `SearchFilters`, `QuestionCardItem`      |
| Model files                | `<name>.model.ts`             | `question.model.ts`, `search.model.ts`   |
| Mapper / adapter functions | `to<Target>` / `from<Source>` | `toQuestionCard`, `toSearchFilters`      |
| Functions & variables      | camelCase                     | `getSearch`, `trimmedQuery`              |
| Constants                  | SCREAMING_SNAKE_CASE          | `SEARCH_PARAMS`, `SEARCH_PAGE_SIZE`      |
| Zod schemas                | `<Name>Schema`                | `DifficultySchema`, `SearchItemSchema`   |

---

## Structural Rules

### Server First

Default to Server Components. Only add `"use client"` when the component genuinely needs interactivity, browser APIs, or React state/effects — filters, theme/language switchers, and anything holding client-side transition state are the exceptions, not the rule.

### No Barrel Abuse

Each layer/slice exposes a public API through its `index.ts`, but that file should re-export the slice's actual public surface — not blindly `export *` every internal file. If something is an implementation detail (a helper only used within the slice), it doesn't belong in the barrel.

### No Deep Imports

Import from a slice's public `index.ts`, never reach into another slice's internal file path directly.

```ts
// Good
import { QuestionCard } from "@/entities/question/ui";

// Avoid
import { QuestionCard } from "@/entities/question/ui/question-card";
```

Exception: importing within the same slice (e.g. `search-view.tsx` importing a sibling file in `views/search/ui`) doesn't need to go through the barrel.

### Respect Layer Dependency Direction

See [`layer-rules.md`](./layer-rules.md) — `app → views → widgets → features → entities → shared`, one direction only. This is enforced by convention and code review today, not by a lint rule; treat it as a hard requirement in PRs regardless.

### One Reason to Change

Prefer several small, single-purpose files over one file doing multiple jobs — e.g. a mapper function, a styling lookup, and a UI component each live in their own file even when small, rather than being inlined together. This is why `entities/question` has separate `lib/to-question-card.ts`, `lib/canonical-difficulty.ts`, and `ui/question-card.tsx` instead of one large file.

### Derive, Don't Duplicate

If a value can be computed from an existing type (`Omit<QuestionBase, ...>`, a shared base interface, a mapper function), derive it rather than hand-maintaining a parallel shape. Two independently-typed interfaces that happen to overlap will drift; one shared source with typed extensions won't.

### Translate at the Boundary, Not in Data

User-facing text (difficulty labels, topic labels) is resolved via `next-intl` or a small display-formatting helper at render time — never baked into stored/fetched data as the canonical value. Canonical values (`"easy" | "medium" | "hard"`) stay language-independent so they work correctly as URL params and filter keys regardless of locale.

---

## Formatting

Formatting is handled exclusively by Prettier (`prettier.config.mjs`) — do not hand-format or fight Prettier's output. ESLint (`eslint.config.mjs`) is responsible only for code quality (import order, unused imports, correctness), not style.

```bash
pnpm format        # apply formatting
pnpm lint:fix       # fix lint issues
pnpm typecheck       # verify types
```

All three should pass before opening a PR — `lint-staged` runs a subset of this automatically on commit.
