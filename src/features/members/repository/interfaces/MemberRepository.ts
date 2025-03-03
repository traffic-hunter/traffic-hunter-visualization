import type { CreateMemberDto, GetMemberResponse, SignInDto } from '@features/members/types'

export interface IMemberRepository {
  createMember(data: CreateMemberDto): Promise<void>
  getMember(id: string): Promise<GetMemberResponse>
  getMembers(): Promise<GetMemberResponse[]>
  signIn(data: SignInDto): Promise<GetMemberResponse>
  signOut(): Promise<void>
}