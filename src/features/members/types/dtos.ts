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

export interface UpdateMemberDto {
  email: string
  password: string
  isAlarm: boolean
}