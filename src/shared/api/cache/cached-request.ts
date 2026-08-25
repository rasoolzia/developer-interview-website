const pendingRequests = new Map<string, Promise<unknown>>();

export async function cachedRequest<T>(
  key: string,
  loader: () => Promise<T>,
): Promise<T> {
  const pending = pendingRequests.get(key);

  if (pending) {
    return pending as Promise<T>;
  }

  const promise = loader().finally(() => {
    pendingRequests.delete(key);
  });

  pendingRequests.set(key, promise);

  return promise;
}
