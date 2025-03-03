import type { StorageService, StorageServiceConfig } from '../interfaces/StorageService'
import type { StorageStrategy } from '../strategies/StorageStrategy'
import type { StorageType } from '../types/StorageType'
import { LocalStorageStrategy, SessionStorageStrategy, MemoryStorageStrategy } from '../strategies/StorageStrategy'

export abstract class AbstractStorageService implements StorageService {
  protected readonly prefix: string
  protected readonly serialize: <T>(value: T) => string
  protected readonly deserialize: <T>(value: string) => T
  protected readonly strategy: StorageStrategy

  constructor(config: StorageServiceConfig = {}) {
    this.prefix = config.prefix || ''
    this.serialize = config.serialize || JSON.stringify
    this.deserialize = config.deserialize || JSON.parse
    this.strategy = this.createStrategy(config.storageType || 'localStorage')
  }

  private createStrategy(type: StorageType): StorageStrategy {
    const strategies: Record<StorageType, StorageStrategy> = {
      localStorage: new LocalStorageStrategy(),
      sessionStorage: new SessionStorageStrategy(),
      memory: new MemoryStorageStrategy()
    }
    return strategies[type]
  }

  protected getPrefixedKey(key: string): string {
    return `${this.prefix}${key}`
  }

  get<T>(key: string): T | null {
    try {
      const value = this.strategy.get(this.getPrefixedKey(key))
      if (!value) return null
      return this.deserialize<T>(value)
    } catch (error) {
      this.handleError('get item from storage', error)
      return null
    }
  }

  set<T>(key: string, value: T): void {
    try {
      this.strategy.set(this.getPrefixedKey(key), this.serialize(value))
    } catch (error) {
      this.handleError('set item to storage', error)
    }
  }

  remove(key: string): void {
    try {
      this.strategy.remove(this.getPrefixedKey(key))
    } catch (error) {
      this.handleError('remove item from storage', error)
    }
  }

  clear(): void {
    try {
      this.strategy.clear(this.prefix)
    } catch (error) {
      this.handleError('clear storage', error)
    }
  }

  protected handleError(operation: string, error: unknown): void {
    console.error(`Failed to ${operation}: ${error}`)
  }
}