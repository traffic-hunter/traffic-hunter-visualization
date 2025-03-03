export class MockIdGenerator {
  private static instance: MockIdGenerator
  private readonly SESSION_USER_ID_PREFIX = 'session_'

  private constructor() {}

  static getInstance(): MockIdGenerator {
    if (!MockIdGenerator.instance) {
      MockIdGenerator.instance = new MockIdGenerator()
    }
    return MockIdGenerator.instance
  }

  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  generateSessionUserId(): string {
    return `${this.SESSION_USER_ID_PREFIX}${this.generateUUID()}`
  }

  generateMemberId(): string {
    return this.generateUUID()
  }

  isSessionUserId(id: string): boolean {
    return id.startsWith(this.SESSION_USER_ID_PREFIX)
  }
}

export const mockIdGenerator = MockIdGenerator.getInstance()