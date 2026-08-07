import { cacheStore } from "./cache-store";

export class CacheManager {
  static get<T>(key: string, hash: string): T | null {
    const cached = cacheStore.get<T>(key);

    if (!cached) {
      return null;
    }

    if (cached.hash !== hash) {
      cacheStore.remove(key);
      return null;
    }

    return cached.data;
  }

  static set<T>(key: string, hash: string, data: T): void {
    cacheStore.set(key, {
      hash,
      data,
    });
  }

  static invalidate(key: string): void {
    cacheStore.remove(key);
  }

  static clear(): void {
    cacheStore.clear();
  }
}
