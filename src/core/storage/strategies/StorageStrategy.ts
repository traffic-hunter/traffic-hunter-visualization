export interface StorageStrategy {
  get(key: string): string | null
  set(key: string, value: string): void
  remove(key: string): void
  clear(prefix?: string): void
}

export class LocalStorageStrategy implements StorageStrategy {
  get(key: string): string | null {
    return localStorage.getItem(key)
  }

  set(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }

  clear(prefix?: string): void {
    if (prefix) {
      Object.keys(localStorage)
        .filter(key => key.startsWith(prefix))
        .forEach(key => localStorage.removeItem(key))
    } else {
      localStorage.clear()
    }
  }
}

export class SessionStorageStrategy implements StorageStrategy {
  get(key: string): string | null {
    return sessionStorage.getItem(key)
  }

  set(key: string, value: string): void {
    sessionStorage.setItem(key, value)
  }

  remove(key: string): void {
    sessionStorage.removeItem(key)
  }

  clear(prefix?: string): void {
    if (prefix) {
      Object.keys(sessionStorage)
        .filter(key => key.startsWith(prefix))
        .forEach(key => sessionStorage.removeItem(key))
    } else {
      sessionStorage.clear()
    }
  }
}

export class MemoryStorageStrategy implements StorageStrategy {
  private storage = new Map<string, string>()

  get(key: string): string | null {
    return this.storage.get(key) || null
  }

  set(key: string, value: string): void {
    this.storage.set(key, value)
  }

  remove(key: string): void {
    this.storage.delete(key)
  }

  clear(prefix?: string): void {
    if (prefix) {
      Array.from(this.storage.keys())
        .filter(key => key.startsWith(prefix))
        .forEach(key => this.storage.delete(key))
    } else {
      this.storage.clear()
    }
  }
}