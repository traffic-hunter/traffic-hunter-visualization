import type { CreateMemberDto } from '@features/members/types'

export interface IMemberRepository {
  createMember(data: CreateMemberDto): Promise<void>
}

export * from './memberRepository'
export * from './mockRepository'