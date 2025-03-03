import { apiClient } from "@core/api/client"
import type { CreateMemberDto, GetMemberResponse, SignInDto, UpdateMemberDto } from '@features/members/types'
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

  async getMember(id: string): Promise<GetMemberResponse> {
    return await apiClient.get<GetMemberResponse>(`${this.baseUrl}/${id}`)
  }

  async getMembers(): Promise<GetMemberResponse[]> {
    return await apiClient.get<GetMemberResponse[]>(this.baseUrl)
  }

  async signIn(data: SignInDto): Promise<GetMemberResponse> {
    return await apiClient.post<GetMemberResponse>(`${this.baseUrl}/sign-in`, data)
  }

  async signOut(): Promise<void> {
    await apiClient.post(`${this.baseUrl}/sign-out`, {})
  }

  async updateMember(id: string, data: UpdateMemberDto): Promise<void> {
    await apiClient.put(this.baseUrl, data, {
      headers: {
        Member: id
      }
    })
  }
}

export const memberRepository = MemberRepository.getInstance()