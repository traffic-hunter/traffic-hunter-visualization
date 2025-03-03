import { userHandlers } from '@/features/users/mock'
import { memberHandlers } from '@/features/members/mock'

export const handlers = [
  ...userHandlers,
  ...memberHandlers,
]