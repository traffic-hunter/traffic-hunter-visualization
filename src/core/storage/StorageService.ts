import type { StorageServiceConfig } from './interfaces/StorageService'
import { AbstractStorageService } from './abstracts/AbstractStorageService'
import { config } from '../config/env'

export class StorageService extends AbstractStorageService {
  private static instances = new Map<string, StorageService>()

  private constructor(config: StorageServiceConfig) {
    super(config)
  }

  public static getInstance(config: StorageServiceConfig = {}): StorageService {
    const key = `${config.prefix || ''}_${config.storageType || 'localStorage'}`
    
    if (!this.instances.has(key)) {
      this.instances.set(key, new StorageService(config))
    }
    
    return this.instances.get(key)!
  }
}

export const storage = StorageService.getInstance({
  prefix: 'traffic_hunter_',
  storageType: 'localStorage'
})

export const mockStorage = StorageService.getInstance({
  prefix: 'mock_traffic_hunter_',
  storageType: config.api.useMock ? 'localStorage' : 'memory'
})