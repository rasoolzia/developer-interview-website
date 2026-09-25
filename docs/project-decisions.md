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

- feat:
- fix:
- docs:
- refactor:
- test:
- build:
- chore:
- ci:
- perf:

## Continuous Integration

### Decision

GitHub Actions is used to verify every push and pull request.

### Why

- Prevent broken builds
- Ensure reproducible installs
- Keep the main branch stable

# Pending Refactors

- Replace DTOs with Domain Models in Services.
- Add Mapper Layer.
- Add Repository Layer.
- Add Domain Errors.
- Add React Query only if needed.

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
