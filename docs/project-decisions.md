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
