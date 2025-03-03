export interface StorageService {
  get<T>(key: string): T | null
  set<T>(key: string, value: T): void
  remove(key: string): void
  clear(): void
}

export interface StorageServiceConfig {
  prefix?: string  
  serialize?: <T>(value: T) => string 
  deserialize?: <T>(value: string) => T  
}