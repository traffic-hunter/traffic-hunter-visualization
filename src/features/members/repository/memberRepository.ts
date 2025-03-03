import { apiClient } from "@core/api/client"
import type { CreateMemberRequestDto, GetMemberResponseDto, SignInRequestDto, UpdateMemberRequestDto } from '@features/members/types'
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

  async createMember(data: CreateMemberRequestDto): Promise<void> {
    await apiClient.post(this.baseUrl, data)
  }

  async getMember(id: string): Promise<GetMemberResponseDto> {
    return await apiClient.get<GetMemberResponseDto>(`${this.baseUrl}/${id}`)
  }

  async getMembers(): Promise<GetMemberResponseDto[]> {
    return await apiClient.get<GetMemberResponseDto[]>(this.baseUrl)
  }

  async getCurrentMember(): Promise<GetMemberResponseDto> {
    return await apiClient.getWithAuth<GetMemberResponseDto>(`${this.baseUrl}/me`)
  }

  async signIn(data: SignInRequestDto): Promise<GetMemberResponseDto> {
    return await apiClient.post<GetMemberResponseDto>(`${this.baseUrl}/sign-in`, data)
  }

  async signOut(): Promise<void> {
    await apiClient.postWithAuth(`${this.baseUrl}/sign-out`, {})
  }

  async updateMember(id: string, data: UpdateMemberRequestDto): Promise<void> {
    await apiClient.putWithAuth(this.baseUrl, data, {
      headers: {
        Member: id
      }
    })
  }

  async deleteMember(id: string): Promise<void> {
    await apiClient.deleteWithAuth(this.baseUrl, {
      headers: {
        Member: id
      }
    })
  }
}

export const memberRepository = MemberRepository.getInstance()