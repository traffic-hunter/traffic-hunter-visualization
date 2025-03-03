import type { Member, CreateMemberDto, GetMemberResponse, SignInDto, UpdateMemberDto } from '@features/members/types'
import { IMemberRepository } from '.'
import { MOCK_STORAGE_KEYS } from '@core/mocks/constants'
import { mockStorage } from '@core/mocks/storage/MockStorageService'
import { mockIdGenerator } from '@core/mocks/utils/MockIdGenerator'

export class MockMemberRepository implements IMemberRepository {
  private members: Member[] = []

  constructor() {
    this.loadMembersFromStorage()
    this.initializeSessionUserIfNeeded()
  }

  async createMember(data: CreateMemberDto): Promise<void> {
    const newMember: Member = {
      id: mockIdGenerator.generateMemberId(),
      email: data.email,
      createdAt: new Date().toISOString(),
      isAlarm: true
    }

    if (this.findMemberByEmail(data.email)) {
      throw new Error('Email already exists')
    }

    this.members.push(newMember)
    this.saveMembersToStorage()
    console.log('Mock: Created member', newMember)
  }

  async getMember(id: string): Promise<GetMemberResponse> {
    this.validateAuthentication()

    const member = this.findMemberById(id)
    if (!member) {
      throw new Error('Member not found')
    }

    return this.mapMemberToResponse(member)
  }

  async getMembers(): Promise<GetMemberResponse[]> {
    this.validateAuthentication()
    return this.members.map(member => this.mapMemberToResponse(member))
  }

  async signIn(data: SignInDto): Promise<GetMemberResponse> {
    const member = this.findMemberByEmail(data.email)
    if (!member) {
      throw new Error('Member not found')
    }

    const userInfo = this.mapMemberToResponse(member)
    mockStorage.set(MOCK_STORAGE_KEYS.SESSION_USER, userInfo)
    console.log('Mock: User signed in', userInfo)

    return userInfo
  }

  async signOut(): Promise<void> {
    mockStorage.remove(MOCK_STORAGE_KEYS.SESSION_USER)
    console.log('Mock: User signed out')
  }

  async updateMember(id: string, data: UpdateMemberDto): Promise<void> {
    this.validateAuthentication()

    const member = this.findMemberById(id)
    if (!member) {
      throw new Error('Member not found')
    }

    member.email = data.email
    member.isAlarm = data.isAlarm
    this.saveMembersToStorage()
    console.log('Mock: Updated member', member)
  }

  private getCurrentUser(): GetMemberResponse | null {
    return mockStorage.get<GetMemberResponse>(MOCK_STORAGE_KEYS.SESSION_USER)
  }

  private loadMembersFromStorage(): void {
    const storedMembers = mockStorage.get<Member[]>(MOCK_STORAGE_KEYS.MEMBERS)
    if (storedMembers) {
      this.members = storedMembers
    }
  }

  private saveMembersToStorage(): void {
    mockStorage.set(MOCK_STORAGE_KEYS.MEMBERS, this.members)
  }

  private initializeSessionUserIfNeeded(): void {
    const sessionUser = this.getCurrentUser()
    if (sessionUser && !this.findMemberByEmail(sessionUser.email)) {
      const newMember: Member = {
        id: mockIdGenerator.generateSessionUserId(),
        email: sessionUser.email,
        createdAt: new Date().toISOString(),
        isAlarm: true
      }
      this.members.push(newMember)
      this.saveMembersToStorage()
    }
  }

  private findMemberById(id: string): Member | undefined {
    return this.members.find(member => member.id === id)
  }

  private findMemberByEmail(email: string): Member | undefined {
    return this.members.find(member => member.email === email)
  }

  private mapMemberToResponse(member: Member): GetMemberResponse {
    return {
      email: member.email,
      isAlarm: member.isAlarm,
      role: 'USER'
    }
  }

  private validateAuthentication(): void {
    if (!this.getCurrentUser()) {
      throw new Error('Unauthorized')
    }
  }
}

export const mockMemberRepository = new MockMemberRepository()