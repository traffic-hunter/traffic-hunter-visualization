import type { StorageServiceConfig } from '@core/storage'
import { AbstractStorageService } from '@core/storage/abstracts/AbstractStorageService'

export class MockStorageService extends AbstractStorageService {
  private static instance: MockStorageService

  private constructor(config: StorageServiceConfig = {}) {
    super({ ...config, prefix: config.prefix || 'mock_' })
  }

  public static getInstance(config?: StorageServiceConfig): MockStorageService {
    if (!MockStorageService.instance) {
      MockStorageService.instance = new MockStorageService(config)
    }
    return MockStorageService.instance
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
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      this.handleError('clear storage', error)
    }
  }
}

export const mockStorage = MockStorageService.getInstance({
  prefix: 'mock_traffic_hunter_'
})