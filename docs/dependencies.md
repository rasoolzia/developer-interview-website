# Dependencies

This document explains **why** each notable dependency was chosen — not a full inventory of `package.json` (see that file for the complete, versioned list), just the ones that reflect a real architectural decision.

Internal shadcn/ui dependencies (`class-variance-authority`, `cmdk`, `tailwind-merge`, `tw-animate-css`) are omitted — they were pulled in transitively by installed shadcn components, not chosen directly, and don't carry independent decisions worth documenting.

---

## next

**Why?**
↓
The App Router, React Server Components, streaming, and nested layouts are the foundation the whole architecture is built on (see [`architecture.md`](./architecture.md)). Server-first rendering keeps client JS minimal and keeps the search page's filter/pagination state resolvable entirely from the URL on the server.

## react / react-dom (v19)

**Why?**
↓
Required by Next.js 16's App Router and Server Components model. v19 additions (`useSyncExternalStore` for SSR-safe hydration checks, improved Suspense/transition behavior) are used directly — e.g. the `useMounted` hook and the search page's pending-state UX both depend on this generation of React.

## next-intl

**Why?**
↓
Internationalization for English and Persian, including locale-prefixed routing (`createNavigation`), server-side message loading per locale, and a locale-aware `Link`/`useRouter`/`usePathname` that keeps navigation correct under `localePrefix: "always"`.

## @teispace/next-themes

**Why?**
↓
Light/dark theme switching with flash-free hydration (no flash of incorrect theme on first paint), compatible with the App Router's persistent root layout.

## zod

**Why?**
↓
Runtime validation for the JSON fetched from the content API (`shared/api/schemas`). The generator project is the source of truth for content, but the frontend still validates shape at the boundary rather than trusting `fetch` responses blindly — see [`public-api.md`](./public-api.md).

## shadcn (ui) + @base-ui/react

**Why?**
↓
Accessible, unstyled component primitives (`@base-ui/react`) with a shadcn-generated styling layer on top, configured for this project's design tokens and RTL support (`components.json`). Components are copied into `shared/ui/shadcn` rather than installed as an opaque package, so they can be customized directly.

## tailwindcss v4

**Why?**
↓
Utility-first styling with native CSS variable theming and logical properties (`ps-*`, `pe-*`, `border-s-*`) — required for clean RTL support without per-locale style overrides.

## lucide-react

**Why?**
↓
Icon set matching shadcn/ui's default iconography, tree-shakeable per-icon imports.

---

## Tooling

### eslint-plugin-simple-import-sort / eslint-plugin-unused-imports

**Why?**
↓
Enforces consistent, automatically-sorted import ordering and removes dead imports — reduces noise in code review and merge conflicts caused by import-order churn.

### prettier + prettier-plugin-tailwindcss

**Why?**
↓
Formatting is handled exclusively by Prettier (ESLint is responsible only for code quality, not formatting — see [`project-decisions.md`](./project-decisions.md)). The Tailwind plugin auto-sorts utility classes into a consistent order.

### husky + lint-staged + commitlint

**Why?**
↓
Enforces linting, formatting, and [Conventional Commits](https://www.conventionalcommits.org/) at commit time, catching issues before they reach CI rather than after.
