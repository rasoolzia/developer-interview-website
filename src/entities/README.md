# Entities Layer

The `entities` layer represents the application's business model.

An entity describes a real concept in the system.

## Current Entities

- Domain
- Topic
- Question
- Language
- Search

## Responsibilities

- Entity types
- Entity-specific UI
- Entity utilities
- Entity model

## Rules

Entities should not know anything about pages or user interactions.

They only describe business objects.

## Examples

Good:

```
entities/question

entities/topic

entities/domain
```

Bad:

```
entities/search-dialog

entities/header

entities/theme
```

Those belong to other layers.
