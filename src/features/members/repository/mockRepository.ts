import type { Member, CreateMemberDto } from '@features/members/types'
import { IMemberRepository } from '.'

export class MockMemberRepository implements IMemberRepository {
  private members: Member[] = []

  async createMember(data: CreateMemberDto): Promise<void> {
    const newMember: Member = {
      id: String(this.members.length + 1),
      email: data.email,
      createdAt: new Date().toISOString()
    }

    if (this.members.some(member => member.email === data.email)) {
      throw new Error('Email already exists')
    }

    this.members.push(newMember)
    console.log('Mock: Created member', newMember)
  }
}

export const mockMemberRepository = new MockMemberRepository()