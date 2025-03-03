import type { StorageService, StorageServiceConfig } from '@core/storage/StorageService'

export class MockStorageService implements StorageService {
  private static instance: MockStorageService
  private readonly prefix: string
  private readonly serialize: <T>(value: T) => string
  private readonly deserialize: <T>(value: string) => T

  private constructor(config: StorageServiceConfig = {}) {
    this.prefix = config.prefix || 'mock_'
    this.serialize = config.serialize || JSON.stringify
    this.deserialize = config.deserialize || JSON.parse
  }

  public static getInstance(config?: StorageServiceConfig): MockStorageService {
    if (!MockStorageService.instance) {
      MockStorageService.instance = new MockStorageService(config)
    }
    return MockStorageService.instance
  }

  private getPrefixedKey(key: string): string {
    return `${this.prefix}${key}`
  }

  get<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(this.getPrefixedKey(key))
      if (!value) return null
      return this.deserialize<T>(value)
    } catch (error) {
      console.error(`Failed to get item from storage: ${error}`)
      return null
    }
  }

  set<T>(key: string, value: T): void {
    try {
      const serialized = this.serialize(value)
      localStorage.setItem(this.getPrefixedKey(key), serialized)
    } catch (error) {
      console.error(`Failed to set item to storage: ${error}`)
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.getPrefixedKey(key))
    } catch (error) {
      console.error(`Failed to remove item from storage: ${error}`)
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error(`Failed to clear storage: ${error}`)
    }
  }
}

export const mockStorage = MockStorageService.getInstance({
  prefix: 'mock_traffic_hunter_'
})