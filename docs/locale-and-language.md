# Locale and Language Architecture

This document defines the distinction between `Locale` and `Language` in the application and documents how they should be used across the project.

The two concepts currently use the same values (`en` and `fa`), but they represent different responsibilities and are intentionally kept as independent types.

This distinction is important because the application UI/routing languages and the languages supported by the content/API layer may evolve independently.

---

## 1. Core Principle

The project has two different language concepts:

- **Locale**: A language/locale supported by the application's UI and routing.
- **Language**: A language supported by the content/API layer.

They are intentionally independent.

Do **not** derive one type from the other.

Do **not** assume that every API language must have a corresponding UI locale.

Do **not** use `Locale` where an API/content layer expects `Language`.

Do **not** use `Language` for application routing or UI behavior.

When a value needs to cross the boundary between these concepts, perform an explicit conversion/validation.

---

# 2. Locale

`Locale` represents a language supported by the application's user interface and URL routing.

Its source of truth is:

```text
src/shared/config/i18n/locales.ts
```

Current definition:

```ts
export type Direction = "ltr" | "rtl";

export type Locale = keyof typeof LOCALES;

export const LOCALES = {
  en: {
    code: "en",
    label: "English",
    nativeLabel: "English",
    direction: "ltr",
  },
  fa: {
    code: "fa",
    label: "Persian",
    nativeLabel: "فارسی",
    direction: "rtl",
  },
} as const;
```

Therefore:

```ts
type Locale = "en" | "fa";
```

### Locale is responsible for

- Next.js URL routing
- `next-intl`
- UI translations
- locale-aware navigation
- text direction
- RTL/LTR behavior
- locale switcher
- other application-level internationalization behavior

For example:

```text
/en/topics
/fa/topics
```

are application routes and therefore use `Locale`.

---

# 3. Language

`Language` represents a language supported by the content/API layer.

Its source of truth is:

```text
src/shared/api/schemas/common.schema.ts
```

Current definition:

```ts
export const SUPPORTED_LANGUAGES = ["en", "fa"] as const;

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0];

export const LanguageSchema = z.enum(SUPPORTED_LANGUAGES);
```

The TypeScript type is derived from the schema:

```ts
export type Language = z.infer<typeof LanguageSchema>;
```

Therefore, currently:

```ts
type Language = "en" | "fa";
```

### Language is responsible for

- API/content data
- question language
- language-specific content
- search filters
- language-keyed API structures
- backend/content support
- content repository languages

For example, a question may have:

```ts
{
  id: "html-001",
  language: "en"
}
```

The `language` field describes the language of the content, not the language of the application's UI.

---

# 4. Why They Must Be Independent

Currently both types contain:

```text
"en"
"fa"
```

This does **not** mean they represent the same concept.

For example, the application could support:

```ts
LOCALES = {
  en: ...,
  fa: ...,
};
```

while the content/API layer could support:

```ts
SUPPORTED_LANGUAGES = ["en", "fa", "ar"];
```

This would mean:

- The application UI supports English and Persian.
- The content system supports English, Persian, and Arabic.
- Arabic content may exist even though the application itself does not provide an Arabic UI.

Conversely, the UI could potentially support a locale that does not correspond one-to-one with a content language.

Therefore:

```text
Locale !== Language
```

even if:

```text
Locale values === Language values
```

today.

---

# 5. Source of Truth

The two concepts have separate sources of truth.

## Locale

```text
src/shared/config/i18n/locales.ts
```

Source:

```ts
LOCALES;
```

Type:

```ts
export type Locale = keyof typeof LOCALES;
```

## Language

```text
src/shared/api/schemas/common.schema.ts
```

Source:

```ts
SUPPORTED_LANGUAGES;
```

Schema:

```ts
LanguageSchema;
```

Type:

```ts
export type Language = z.infer<typeof LanguageSchema>;
```

The project must not create one from the other.

---

# 6. Route Params and Locale

An important Next.js constraint is that route parameters should remain `string`.

For example:

```ts
type Props = {
  params: Promise<{
    locale: string;
    domain: string;
    topic: string;
  }>;
};
```

Do not change this to:

```ts
locale: Locale;
```

even though the route is conceptually a locale.

Next.js generates its own route validation types and expects route params to be represented as strings.

Using:

```ts
locale: Locale;
```

caused a Next.js generated type error similar to:

```text
Type 'Promise<{ locale: string; }>' is not assignable to type
'Promise<{ locale: "en" | "fa"; }>'.
```

Therefore the rule is:

```text
Next.js route param
        ↓
     string
        ↓
next-intl validates/resolves locale
        ↓
     Locale
```

---

# 7. Where Locale Validation Happens

The `[locale]` layout is the application's locale boundary.

File:

```text
src/app/[locale]/layout.tsx
```

The layout validates the route locale:

```ts
const { locale } = await params;

if (!isLocale(locale)) {
  notFound();
}
```

This is intentionally the primary runtime validation boundary.

Child pages should not repeatedly perform:

```ts
if (!isLocale(locale)) {
  notFound();
}
```

The project previously added these checks to individual pages, but they were redundant and made the route layer unnecessarily noisy.

The final architecture keeps the locale validation at the `[locale]` layout boundary.

---

# 8. Using `getLocale()`

Inside server components and server-side route code, use `next-intl`'s `getLocale()` when the application needs the current UI locale.

Example:

```ts
const locale = await getLocale();
```

This is preferred over repeatedly extracting and validating:

```ts
const { locale } = await params;
```

for locale-aware application logic.

For example:

```ts
export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const [locale, paramsValue] = await Promise.all([
    getLocale(),
    searchParams,
  ]);

  return (
    <SearchView
      filters={toSearchFilters(paramsValue ?? {}, locale)}
    />
  );
}
```

This makes the responsibility clear:

- Next.js route params identify the route.
- `next-intl` provides the current application locale.
- API/content functions receive `Language` when they need content language.

---

# 9. `isLocale`

The project defines:

```ts
export function isLocale(value: string): value is Locale {
  return Object.hasOwn(LOCALES, value);
}
```

This is a TypeScript type guard.

It is useful at boundaries where an arbitrary string must be verified as an application locale.

Its primary current usage is the `[locale]` layout.

It should not be scattered throughout every child page.

---

# 10. `LOCALE_CODES`

The routing configuration uses:

```ts
export const LOCALE_CODES = Object.keys(LOCALES).filter(isLocale);
```

and:

```ts
export const routing = defineRouting({
  locales: LOCALE_CODES,
  defaultLocale,
  localePrefix: "always",
});
```

This keeps routing tied to `LOCALES`, without using a type assertion such as:

```ts
Object.keys(LOCALES) as Locale[];
```

The type guard provides the narrowing.

---

# 11. Converting Locale to Language

Sometimes application UI code has a `Locale`, but an API/content function requires a `Language`.

This conversion must be explicit.

The project uses:

```text
src/shared/lib/pars-language.ts
```

with:

```ts
export function parseLanguage(
  value: string | undefined,
  fallbackValue?: string,
): Language {
  const result = LanguageSchema.safeParse(value);

  if (result.success) {
    return result.data;
  }

  const fallback = LanguageSchema.safeParse(fallbackValue);

  return fallback.success ? fallback.data : DEFAULT_LANGUAGE;
}
```

The function validates against `LanguageSchema`.

It does not cast:

```ts
value as Language;
```

and it does not assume that every arbitrary string is a valid API language.

---

# 12. Where `parseLanguage()` Should Be Used

Use `parseLanguage()` when crossing from an application-level value into an API/content-level language.

For example:

```ts
getTopicDetails(domain, topic, parseLanguage(locale));
```

or:

```ts
useReportedQuestions(parseLanguage(locale));
```

The important concept is the boundary:

```text
UI / next-intl
      │
    Locale
      │
      ▼
parseLanguage()
      │
   Language
      │
      ▼
API / content
```

Do not use `parseLanguage()` merely because a variable happens to contain a language-like string.

It exists specifically to validate/convert values when a `Language` is required.

---

# 13. Search Language

Search filters belong to the content/search domain, not the UI routing domain.

Therefore:

```ts
export interface SearchFilters {
  query?: string;
  domain?: string;
  topic?: string;
  difficulty?: string;
  category?: string;
  language: Language;
  page?: number;
}
```

The `language` property is intentionally:

```ts
Language;
```

not:

```ts
Locale;
```

because search operates on content language.

When URL search parameters provide a language value, that value is external/untrusted input and should be parsed/validated before being placed into `SearchFilters`.

---

# 14. Search Query Language vs UI Locale

The following two values can originate from different places:

```text
UI locale
/en/search
```

and:

```text
/search?language=fa
```

The first controls the application's interface.

The second controls which content language the search should use.

They must not be confused.

For example:

```text
/fa/search?language=en
```

is perfectly valid conceptually:

- UI: Persian
- Search content: English

This is one of the reasons `Locale` and `Language` must remain separate.

---

# 15. Content Data Should Use Language

Structures representing API/content data should use `Language`.

For example:

```ts
Partial<Record<Language, number>>;
```

is appropriate for language-specific content statistics:

```ts
export interface LandingStats {
  questions: Partial<Record<Language, number>>;
  topics: number;
  domains: number;
  languages: number;
}
```

This is preferable to:

```ts
Record<Locale, number>;
```

because the data belongs to the content/API layer.

If the backend later adds another content language, this model can evolve independently from UI routing.

---

# 16. UI Data Should Use Locale

UI configuration should use `Locale`.

Examples:

```ts
getDirection(locale);
```

```ts
isRTL(locale);
```

```ts
getDrawerSide(locale);
```

```ts
LOCALES[locale];
```

These operations are application/UI concerns.

They should not use `Language`.

---

# 17. Practical Decision Rule

When deciding which type to use, ask:

### "Is this about the application interface or URL?"

Use:

```ts
Locale;
```

Examples:

- `/en/...`
- `/fa/...`
- translations
- RTL/LTR
- locale switcher
- navigation
- UI configuration

### "Is this about content or the API?"

Use:

```ts
Language;
```

Examples:

- question language
- search language
- API language parameter
- content language
- language-specific statistics
- language-specific question data

---

# 18. Quick Reference

| Concern                     | Type       |
| --------------------------- | ---------- |
| URL `/en/...`               | `Locale`   |
| URL `/fa/...`               | `Locale`   |
| next-intl                   | `Locale`   |
| UI translations             | `Locale`   |
| RTL/LTR                     | `Locale`   |
| Language switcher           | `Locale`   |
| API language                | `Language` |
| Question language           | `Language` |
| Search filter language      | `Language` |
| Content repository language | `Language` |
| API statistics by language  | `Language` |
| Backend-supported languages | `Language` |

---

# 19. Anti-Patterns

Avoid these patterns.

### Do not cast route params

```ts
locale as Locale;
```

Route params should remain `string`.

---

### Do not cast arbitrary strings to Language

```ts
value as Language;
```

Use schema validation instead:

```ts
parseLanguage(value);
```

---

### Do not derive Language from Locale

Avoid:

```ts
type Language = Locale;
```

or:

```ts
const SUPPORTED_LANGUAGES = Object.keys(LOCALES);
```

The content/API layer has its own source of truth.

---

### Do not derive Locale from Language

Avoid:

```ts
type Locale = Language;
```

The application UI/routing layer has its own source of truth.

---

### Do not validate locale repeatedly in every child page

Avoid:

```ts
if (!isLocale(locale)) {
  notFound();
}
```

in every route under `[locale]`.

The `[locale]` layout is the validation boundary.

---

# 20. Current Architecture

The current flow is:

```text
                         URL
                          │
                          ▼
                 [locale] route param
                          │
                       string
                          │
                          ▼
                 [locale] layout
                          │
                     isLocale()
                          │
                          ▼
                       Locale
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
          next-intl UI           UI behavior
          translations           RTL / LTR
              │
              │
              │ explicit boundary
              ▼
       parseLanguage()
              │
              ▼
          Language
              │
       ┌──────┴──────┐
       │             │
       ▼             ▼
     API          Content
       │             │
       └──────┬──────┘
              ▼
      Questions / Search /
      Topics / Statistics
```

---

# 21. Example: Same Values, Different Meaning

Today:

```ts
Locale = "en" | "fa";

Language = "en" | "fa";
```

This can make the distinction appear unnecessary.

Consider a future state:

```ts
Locale = "en" | "fa";

Language = "en" | "fa" | "ar";
```

Now:

```text
/fa/topics
```

means:

```text
Persian UI
```

while:

```text
language=ar
```

means:

```text
Arabic content
```

The two systems can evolve independently without breaking the application's routing architecture.

That is the reason for keeping the types separate even while their current values overlap.

---

# 22. Historical Type Issue

An earlier implementation attempted to make route parameters strongly typed:

```ts
type Props = {
  params: Promise<{
    locale: Locale;
  }>;
};
```

This appeared attractive because the route is conceptually restricted to supported locales.

However, Next.js generated route validation expects:

```ts
params: Promise<{
  locale: string;
}>;
```

Using `Locale` directly caused errors in:

```text
.next/types/validator.ts
.next/dev/types/validator.ts
```

The final solution is:

1. Keep Next.js route params as `string`.
2. Validate the `[locale]` boundary once.
3. Use `next-intl`'s `getLocale()` for the application locale.
4. Convert to `Language` explicitly only when crossing into content/API logic.

This keeps both Next.js and the application's domain model correctly typed.

---

# 23. Maintenance Rule

When adding a new language in the future, first determine which system is changing.

### Adding a UI locale

Update:

```text
src/shared/config/i18n/locales.ts
```

Then update the corresponding next-intl message files and routing-related configuration as required.

### Adding an API/content language

Update:

```text
src/shared/api/schemas/common.schema.ts
```

For example:

```ts
export const SUPPORTED_LANGUAGES = ["en", "fa", "ar"] as const;
```

Do not automatically add it to `LOCALES`.

A backend/content language does not automatically imply a new UI locale.

---

# 24. Final Rule

The simplest rule to remember is:

```text
Locale = "What language is the application UI using?"

Language = "What language is the content/API using?"
```

They currently contain the same values by coincidence of the current product requirements.

They are different concepts by design.
