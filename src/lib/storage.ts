// Safe localStorage/sessionStorage access

export const loadJson = <T>(storage: Storage, key: string, fallback: T): T => {
  try {
    const raw = storage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export const saveJson = (storage: Storage, key: string, value: unknown): void => {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage unavailable or full - ignore
  }
}

export const removeKey = (storage: Storage, key: string): void => {
  try {
    storage.removeItem(key)
  } catch {
    // ignore
  }
}
