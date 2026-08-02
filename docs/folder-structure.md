# Folder Structure

This project follows Feature-Sliced Design.

Each layer has a dedicated responsibility.

```

src/

```

src/
│
├── app/
│ ├── [locale]/
│ ├── providers/
│ ├── layouts/
│ ├── styles/
│ └── config/
│
├── shared/
│ ├── api/
│ ├── assets/
│ ├── config/
│ ├── constants/
│ ├── hooks/
│ ├── lib/
│ ├── model/
│ ├── types/
│ ├── ui/
│ ├── utils/
│ └── styles/
│
├── entities/
│ ├── domain/
│ ├── topic/
│ ├── question/
│ ├── language/
│ └── search/
│
├── features/
│ ├── language-switcher/
│ ├── theme-switcher/
│ ├── search/
│ ├── filters/
│ ├── copy-link/
│ ├── bookmark/
│ └── share/
│
├── widgets/
│ ├── header/
│ ├── footer/
│ ├── sidebar/
│ ├── topic-grid/
│ ├── question-list/
│ ├── search-panel/
│ └── breadcrumbs/
│
├── views/
│ ├── landing/
│ ├── domain/
│ ├── topic/
│ ├── question/
│ ├── search/
│ └── not-found/
│
└── processes/

---

## app

Application entry point.

Responsible for:

- Routing
- Layouts
- Providers
- Global styles

---

## shared

Reusable modules with no business knowledge.

Contains:

- API
- UI
- Hooks
- Utils
- Types
- Config
- Assets

---

## entities

Business models.

Current entities:

- Domain
- Topic
- Question
- Language
- Search

---

## features

User actions.

Examples:

- Search
- Bookmark
- Share
- Filters

---

## widgets

Reusable page sections.

Examples:

- Header
- Sidebar
- Footer
- Topic Grid

---

## views

Complete application pages.

Each route maps to exactly one view.

---

## processes

Reserved for long-running application workflows.

Currently unused.
