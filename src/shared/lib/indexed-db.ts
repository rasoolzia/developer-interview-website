const DB_NAME = "interview-app";
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

export function getDb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains("bookmarkLists")) {
          db.createObjectStore("bookmarkLists", { keyPath: "id" });
        }

        if (!db.objectStoreNames.contains("bookmarkItems")) {
          db.createObjectStore("bookmarkItems", {
            keyPath: ["listId", "questionId"],
          });
        }

        if (!db.objectStoreNames.contains("reports")) {
          db.createObjectStore("reports", { keyPath: "questionId" });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  return dbPromise;
}

export function dbGet<T>(
  store: string,
  key: IDBValidKey,
): Promise<T | undefined> {
  return getDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const req = db
          .transaction(store, "readonly")
          .objectStore(store)
          .get(key);
        req.onsuccess = () => resolve(req.result as T | undefined);
        req.onerror = () => reject(req.error);
      }),
  );
}

export function dbGetAll<T>(store: string): Promise<T[]> {
  return getDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const req = db
          .transaction(store, "readonly")
          .objectStore(store)
          .getAll();
        req.onsuccess = () => resolve(req.result as T[]);
        req.onerror = () => reject(req.error);
      }),
  );
}

export function dbPut(store: string, value: unknown): Promise<void> {
  return getDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const req = db
          .transaction(store, "readwrite")
          .objectStore(store)
          .put(value);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      }),
  );
}

export function dbDelete(store: string, key: IDBValidKey): Promise<void> {
  return getDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const req = db
          .transaction(store, "readwrite")
          .objectStore(store)
          .delete(key);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      }),
  );
}
