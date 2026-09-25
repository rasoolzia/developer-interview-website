# Caching

## Current policy

The website uses **Next.js Cache Components** for server-side caching.

Generated JSON resources are cached with `"use cache"` so stable server data can be reused across requests. The main cached resources are:

- `manifest.json`
- `search-index.json`
- Per-topic JSON files

Cache Components are enabled globally through:

```ts
const nextConfig: NextConfig = {
  cacheComponents: true,
};
```

Caching is applied to stable server-side data only. Request-specific runtime data must remain outside cached functions.

## Responsibilities

```
Service / Repository
        ↓
Cached server function
        ↓
ApiClient
        ↓
Static JSON API
```

Repositories and services should keep the caching boundary close to the data-fetching operation.

A cached function should only depend on values that are safe to share between requests. Request-specific values such as `cookies()`, `headers()`, `params`, and `searchParams` must not be accessed inside a cached function.

## `"use cache"`

`"use cache"` marks a server function as cacheable under Next.js Cache Components.

For example:

```
export async function getExample() {
  "use cache";

  return exampleRepository.getExample();
}
```

For resources with parameters, those parameters become part of the cache identity:

```
export async function getTopic(
  domain: string,
  topic: string,
  language: string,
) {
  "use cache";

  return topicRepository.getTopic(domain, topic, language);
}
```

Do not put `"use cache"` inside inline class instance methods. Next.js does not allow inline `"use cache"` annotations on regular class instance methods.

Use standalone functions, object method properties, or static class methods when a cached function is required.

## `fetch` caching

The API client may still use:

```
fetch(url, {
  cache: "force-cache",
});
```

This is the HTTP fetch caching policy and is separate from the `"use cache"` Cache Components boundary.

The two mechanisms should not be confused:

- `"use cache"` controls caching of the server function and its result.
- `fetch(..., { cache: "force-cache" })` controls the fetch request's caching behavior.

Keep the existing `force-cache` behavior in the API client unless there is a deliberate architectural reason to change the fetch policy.

## Runtime data and `<Suspense>`

Cache Components distinguish stable data from request-specific runtime data.

Examples of runtime data include:

- `cookies()`
- `headers()`
- `params`
- `searchParams`
- request-dependent values such as the current time

Runtime data should not be accessed from a cached function.

When runtime data is required during rendering, it may need to be placed behind an appropriate `<Suspense>` boundary so that it does not block the entire route from being prerendered.

Locale-aware code using `next-intl` requires particular care because APIs such as `requestLocale` can depend on request context.

## Adding a new JSON resource

When adding another generated JSON resource:

1.  Add the repository method responsible for fetching it.
2.  Add the appropriate `"use cache"` boundary where the resource is fetched.
3.  Make sure all arguments to the cached function are stable and safe to share.
4.  Do not access request-specific runtime data inside the cached function.
5.  Validate the response with the appropriate Zod schema.

Example:

```
export async function getExample() {
  "use cache";

  return exampleRepository.getExample();
}
```

For parameterized resources:

```
export async function getExample(
  domain: string,
  topic: string,
  language: string,
) {
  "use cache";

  return exampleRepository.getExample(domain, topic, language);
}
```

## Cache Components and static generation

The application uses Cache Components together with `generateStaticParams()` for locale routes.

This allows stable parts of the application to be prerendered while dynamic server-rendered content can be streamed when necessary.

The current production build should show routes using Partial Prerendering when applicable.

## Future hash-based invalidation

The generator supplies topic hashes through `manifest.json`.

A future cache strategy may use those hashes to invalidate only changed topic files. This is intentionally not implemented yet.

The current strategy relies on Next.js Cache Components and the cache lifetime/configuration of the cached server functions.
