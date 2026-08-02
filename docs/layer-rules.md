# Layer Rules

## Dependency Direction

Dependencies may only point downward.

```
app
    ↓
views
    ↓
widgets
    ↓
features
    ↓
entities
    ↓
shared
```

## Rules

- Higher layers may depend on lower layers.
- Lower layers must never depend on higher layers.
- Avoid deep imports across layers.
- Expose each layer through a clear public API (`index.ts`) whenever appropriate.
- Shared must remain framework-agnostic and business-agnostic.

Violating these rules increases coupling and makes the project harder to maintain, test, and scale.
