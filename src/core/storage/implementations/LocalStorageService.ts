import type { StorageServiceConfig } from '../interfaces/StorageService'
import { AbstractStorageService } from '../abstracts/AbstractStorageService'

export class LocalStorageService extends AbstractStorageService {
  private static instance: LocalStorageService

  private constructor(config: StorageServiceConfig = {}) {
    super(config)
  }

  public static getInstance(config?: StorageServiceConfig): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService(config)
    }
    return LocalStorageService.instance
  }

  get<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(this.getPrefixedKey(key))
      if (!value) return null
      return this.deserialize<T>(value)
    } catch (error) {
      this.handleError('get item from storage', error)
      return null
    }
  }

  set<T>(key: string, value: T): void {
    try {
      const serialized = this.serialize(value)
      localStorage.setItem(this.getPrefixedKey(key), serialized)
    } catch (error) {
      this.handleError('set item to storage', error)
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.getPrefixedKey(key))
    } catch (error) {
      this.handleError('remove item from storage', error)
    }
  }

  clear(): void {
    try {
      if (this.prefix) {
        const keys = Object.keys(localStorage)
        keys.forEach(key => {
          if (key.startsWith(this.prefix)) {
            localStorage.removeItem(key)
          }
        })
      } else {
        localStorage.clear()
      }
    } catch (error) {
      this.handleError('clear storage', error)
    }
  }
}

export const storage = LocalStorageService.getInstance({
  prefix: 'traffic_hunter_'
})