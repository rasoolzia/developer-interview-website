## ESLint

- Use Flat Config.
- Use simple-import-sort for import ordering.
- Use unused-imports to automatically remove unused imports.
- Formatting is handled exclusively by Prettier.
- ESLint is responsible only for code quality.

## Known Issues

### ESLint config import ordering

`eslint.config.mjs` imports are reordered by VS Code on save, while ESLint fixes them correctly.

Impact:

- No effect on application code.
- No effect on CI.
- No effect on linting.

Status:

Deferred.

## Commit Convention

We follow the Conventional Commits specification.

Examples:

- `feat:`
- `fix:`
- `docs:`
- `refactor:`
- `test:`
- `build:`
- `chore:`
- `ci:`
- `perf:`

## Continuous Integration

### Decision

GitHub Actions is used to verify every push and pull request.

### Why

- Prevent broken builds
- Ensure reproducible installs
- Keep the main branch stable

## Cache Strategy

### Decision

The project uses **Next.js Cache Components** for server-side caching.

`cacheComponents: true` is enabled in `next.config.ts`, and stable generated JSON resources use `"use cache"` at their server-side caching boundaries.

### Why

The content API consists of generated static JSON files that are safe to share between visitors. Caching these resources avoids unnecessary repeated downloads while keeping the application server-first.

### Rules

- Cache only stable, shared data.
- Do not access `cookies()`, `headers()`, `params`, or `searchParams` inside cached functions.
- Do not access request-specific runtime data from a cached function.
- Do not use inline `"use cache"` annotations inside regular class instance methods.
- Keep Zod validation at the API boundary.
- Keep request-specific rendering outside the cache boundary.

See [`caching.md`](caching.md) for the complete caching policy and implementation guidance.

## Locale and Language

The project keeps **UI locale** and **content language** as separate concepts.

- `Locale` represents the language of the application UI and is derived from `LOCALES`.
- `Language` represents the language of content and API data and is derived from `LanguageSchema`.
- Route parameters remain typed as `string` because they are runtime URL values.
- The `[locale]` layout is the single route-level validation boundary for supported locales.
- Server components use `getLocale()` from `next-intl/server` for the current typed UI locale.
- `parseLanguage()` is used when converting UI or external string values into the API/content `Language` type.
- `Locale` and `Language` must not be treated as interchangeable types.

See [`locale-and-language.md`](locale-and-language.md) for the complete policy and rationale.
