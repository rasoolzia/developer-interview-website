# Shared Layer

The `shared` layer contains reusable, framework-independent modules that can be used across the entire application.

This layer **must not contain any business logic** related to interview questions, topics, domains, or other application-specific concepts.

## Responsibilities

- API client
- Shared UI components
- Utility functions
- Configuration
- Global constants
- Shared hooks
- Shared types
- Assets
- Global styles

## Rules

- Must not depend on `entities`, `features`, `widgets`, or `views`.
- Everything should be reusable.
- Keep modules as small and focused as possible.
- Avoid creating "miscellaneous" utilities.

## Public API

Every shared module should expose a clear public API through its own `index.ts` when appropriate.

## Examples

Good:

```
shared/ui/button
shared/utils/date
shared/hooks/use-media-query
```

Bad:

```
shared/question-utils
shared/react-topic-helper
shared/frontend-data
```

Those belong to higher layers.
