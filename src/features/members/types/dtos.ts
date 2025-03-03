export interface CreateMemberRequestDto {
  email: string
  password: string
}

export interface SignInRequestDto {
  email: string
  password: string
}

export interface GetMemberResponseDto {
  email: string
  isAlarm: boolean
  role: string
}

export interface UpdateMemberRequestDto {
  email: string
  password: string
  isAlarm: boolean
}