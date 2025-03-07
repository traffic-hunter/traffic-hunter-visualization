import type { Member, CreateMemberRequestDto, GetMemberResponseDto, SignInRequestDto, UpdateMemberRequestDto } from '@features/members/types'
import { IMemberRepository } from '.'
import { MOCK_STORAGE_KEYS } from '@core/mocks/constants'
import { mockIdGenerator } from '@core/mocks/utils/MockIdGenerator'
import { mockStorage } from '@/core/storage/StorageService'

export class MockMemberRepository implements IMemberRepository {
  private members: Member[] = []

  constructor() {
    this.loadMembersFromStorage()
    this.initializeSessionUserIfNeeded()
  }

  async createMember(data: CreateMemberRequestDto): Promise<void> {
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

  async getMember(id: string): Promise<GetMemberResponseDto> {
    this.validateAuthentication()

    const member = this.findMemberById(id)
    if (!member) {
      throw new Error('Member not found')
    }

    return this.mapMemberToResponse(member)
  }

  async getMembers(): Promise<GetMemberResponseDto[]> {
    this.validateAuthentication()
    return this.members.map(member => this.mapMemberToResponse(member))
  }

  async getCurrentMember(): Promise<GetMemberResponseDto> {
    const currentUser = mockStorage.get<GetMemberResponseDto>(MOCK_STORAGE_KEYS.SESSION_USER)
    if (!currentUser) {
      throw new Error('Not authenticated')
    }
    return currentUser
  }

  async signIn(data: SignInRequestDto): Promise<GetMemberResponseDto> {
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

  async updateMember(id: string, data: UpdateMemberRequestDto): Promise<void> {
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

  async deleteMember(id: string): Promise<void> {
    this.validateAuthentication()

    const memberIndex = this.members.findIndex(member => member.id === id)
    if (memberIndex === -1) {
      throw new Error('Member not found')
    }

    this.members.splice(memberIndex, 1)
    this.saveMembersToStorage()
    console.log('Mock: Deleted member with ID', id)
  }

  private getCurrentUser(): GetMemberResponseDto | null {
    return mockStorage.get<GetMemberResponseDto>(MOCK_STORAGE_KEYS.SESSION_USER)
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

  private mapMemberToResponse(member: Member): GetMemberResponseDto {
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