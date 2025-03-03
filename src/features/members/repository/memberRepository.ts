import { apiClient } from "@core/api/client"
import type { CreateMemberDto } from '@features/members/types'
import { IMemberRepository } from '.'

export class MemberRepository implements IMemberRepository {
  private static instance: MemberRepository
  private readonly baseUrl = '/members'

  private constructor() {}

  public static getInstance(): MemberRepository {
    if (!MemberRepository.instance) {
      MemberRepository.instance = new MemberRepository()
    }
    return MemberRepository.instance
  }

  async createMember(data: CreateMemberDto): Promise<void> {
    await apiClient.post(this.baseUrl, data)
  }
}

export const memberRepository = MemberRepository.getInstance()