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
- Add Cache Layer.
- Add Domain Errors.
- Add React Query only if needed.

## Cache Strategy

The application currently uses an in-memory request cache.

Goals:

- Deduplicate concurrent requests.
- Avoid multiple downloads of the same static resources during a single server render.
- Keep repositories responsible only for data fetching.
- Keep caching logic outside repositories.

Future versions may extend this layer with persistent caching (IndexedDB, LocalStorage, Service Worker) using content hashes from the API responses without changing repository implementations.
