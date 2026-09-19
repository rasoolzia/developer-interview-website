const cache = new Map<string, Promise<unknown>>();

export async function cachedRequest<T>(
  key: string,
  loader: () => Promise<T>,
): Promise<T> {
  const cached = cache.get(key);

  if (cached) {
    return cached as Promise<T>;
  }

  const promise = loader();

  cache.set(key, promise);

  try {
    return await promise;
  } catch (error) {
    cache.delete(key);
    throw error;
  }
}
