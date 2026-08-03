# Features Layer

A feature represents a user action.

If a user can perform an action, it probably belongs here.

## Current Features

- Search
- Filters
- Bookmark
- Share
- Theme Switcher
- Language Switcher
- Copy Link

## Responsibilities

- User interactions
- Client-side business logic
- Feature-specific UI

## Rules

A feature should solve exactly one user problem.

Avoid creating "mega-features" that handle multiple responsibilities.

## Examples

Good:

```
search

bookmark

share
```

Bad:

```
everything

homepage

layout
```
