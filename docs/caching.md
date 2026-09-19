# Caching

## Current policy

All generated JSON files use one server-memory cache policy:

1. The first request for a resource downloads and validates its JSON.
2. The returned Promise is stored under that resource's cache key.
3. Every later request for the same key receives the same resolved Promise instead of downloading the file again.
4. If the request fails, the Promise is removed. The next request can retry it.

This applies to `manifest.json`, `search-index.json`, and each topic JSON file.

## Responsibilities

```text
Service -> chooses a stable cache key and calls cachedRequest
Repository -> fetches and returns a JSON DTO
ApiClient -> performs the HTTP request
```

Repositories must not cache. They are fetch-only so that services can choose the right cache key and policy.

## `cachedRequest`

`cachedRequest(key, loader)` is the entire cache implementation. It stores a Promise, rather than only the resolved value. That means it handles both situations:

- Two requests arrive at the same time: both await the one in-flight Promise.
- A later request arrives after it completed: it gets the already-resolved Promise immediately.

The cache lives in the memory of the current Next.js server process. It is cleared when that process restarts and is not shared between separate deployed instances. It is not browser storage or an offline/PWA cache.

## Adding a new JSON resource

1. Add a stable key to `src/shared/api/cache/cache-key.ts`.
2. Add a fetch-only method to the matching repository.
3. Use `cachedRequest` in the service.

```ts
export async function getExample() {
  return cachedRequest(cacheKeys.example(), () =>
    exampleRepository.getExample(),
  );
}
```

Use only data that is safe to share for every visitor of this server process. Do not use this cache for user-specific, authenticated, or frequently changing data.

## Future hash cache

The generator supplies topic hashes through `manifest.json`. A future hash-aware cache can use those hashes to invalidate only changed topic files. It is intentionally not enabled yet, because this policy caches the manifest itself and therefore does not receive a newer hash until the server-memory cache is cleared or restarted.
