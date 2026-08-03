# Views Layer

A view represents a complete page.

Each route should have exactly one corresponding view.

## Current Views

- Landing
- Domain
- Topic
- Question
- Search
- Not Found

## Responsibilities

- Assemble widgets
- Fetch page data
- Compose page layout

## Rules

Views should not contain reusable business logic.

If something can be reused, move it to a lower layer.
