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

Generated JSON responses are retained in server memory after their first successful request. The same Promise is returned for later requests with the same key, while failed requests are removed so they can be retried.

Repositories only fetch data. Services own cache keys and orchestration. See [Caching](caching.md) for the resource flow and the recipe for adding another API file.
