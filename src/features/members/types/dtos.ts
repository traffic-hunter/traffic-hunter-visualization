export interface CreateMemberDto {
  email: string
  password: string
}

export interface SignInDto {
  email: string
  password: string
}

export interface GetMemberResponse {
  email: string
  isAlarm: boolean
  role: string
}