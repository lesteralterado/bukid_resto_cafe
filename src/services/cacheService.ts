type CacheEntry<T> = {
  value: T;
  expires: number;
};

const PREFIX = "bukid_cache:";
const DEFAULT_TTL = 300000;

function storageKey(key: string): string {
  return `${PREFIX}${key}`;
}

export const cacheService = {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(storageKey(key));
      if (!raw) return null;

      const entry: CacheEntry<T> = JSON.parse(raw);
      if (Date.now() > entry.expires) {
        localStorage.removeItem(storageKey(key));
        return null;
      }

      return entry.value;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T, ttlMs: number = DEFAULT_TTL): void {
    try {
      const entry: CacheEntry<T> = {
        value,
        expires: Date.now() + ttlMs,
      };
      localStorage.setItem(storageKey(key), JSON.stringify(entry));
    } catch {
      localStorage.removeItem(storageKey(key));
    }
  },

  has(key: string): boolean {
    return this.get(key) !== null;
  },

  clear(key?: string): void {
    if (key) {
      const fullKey = storageKey(key);
      try {
        localStorage.removeItem(fullKey);
      } catch {
        // ignore
      }
      return;
    }

    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const k = localStorage.key(i);
      if (k && k.startsWith(PREFIX)) {
        keys.push(k);
      }
    }
    keys.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch {
        // ignore
      }
    });
  },
};
