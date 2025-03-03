import type { StorageService, StorageServiceConfig } from '../interfaces/StorageService'

export abstract class AbstractStorageService implements StorageService {
  protected readonly prefix: string
  protected readonly serialize: <T>(value: T) => string
  protected readonly deserialize: <T>(value: string) => T

  constructor(config: StorageServiceConfig = {}) {
    this.prefix = config.prefix || ''
    this.serialize = config.serialize || JSON.stringify
    this.deserialize = config.deserialize || JSON.parse
  }

  protected getPrefixedKey(key: string): string {
    return `${this.prefix}${key}`
  }

  abstract get<T>(key: string): T | null
  abstract set<T>(key: string, value: T): void
  abstract remove(key: string): void
  abstract clear(): void

  protected handleError(operation: string, error: unknown): void {
    console.error(`Failed to ${operation}: ${error}`)
  }
}