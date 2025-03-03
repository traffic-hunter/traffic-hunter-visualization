import type { SetupWorker } from 'msw/browser'
import type { HttpHandler } from 'msw'

export class MockServiceWorker {
  private static instance: MockServiceWorker
  private worker: SetupWorker | null = null
  private isInitialized = false
  private handlers: HttpHandler[] = []

  private constructor() {}

  public static getInstance(): MockServiceWorker {
    if (!MockServiceWorker.instance) {
      MockServiceWorker.instance = new MockServiceWorker()
    }
    return MockServiceWorker.instance
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.warn('MSW is already initialized')
      return
    }

    if (import.meta.env.MODE === 'production') {
      console.info('MSW is disabled in production')
      return
    }

    try {
      const { worker } = await import('./browser')
      this.worker = worker
      await this.worker.start({
        onUnhandledRequest: 'bypass'
      })
      this.isInitialized = true
      console.info('MSW initialized successfully')
    } catch (error) {
      console.error('Failed to initialize MSW:', error)
      throw error
    }
  }

  public getWorker(): SetupWorker | null {
    return this.worker
  }

  public addHandlers(handlers: HttpHandler[]): void {
    this.handlers.push(...handlers)
    if (this.worker) {
      this.worker.resetHandlers(...this.handlers)
    }
  }

  public async stop(): Promise<void> {
    if (!this.worker || !this.isInitialized) {
      return
    }

    await this.worker.stop()
    this.isInitialized = false
  }
}

export const mockService = MockServiceWorker.getInstance()