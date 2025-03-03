import type { CreateMemberRequestDto, GetMemberResponseDto, SignInRequestDto, UpdateMemberRequestDto } from '@features/members/types'

export interface IMemberRepository {
  createMember(data: CreateMemberRequestDto): Promise<void>
  getMember(id: string): Promise<GetMemberResponseDto>
  getMembers(): Promise<GetMemberResponseDto[]>
  signIn(data: SignInRequestDto): Promise<GetMemberResponseDto>
  signOut(): Promise<void>
  updateMember(id: string, data: UpdateMemberRequestDto): Promise<void>
  deleteMember(id: string): Promise<void>
  getCurrentMember(): Promise<GetMemberResponseDto>
}