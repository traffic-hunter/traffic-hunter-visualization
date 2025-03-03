import { userHandlers } from '@/features/example/mock'
import { memberHandlers } from '@features/members/mock'

export const handlers = [
  ...userHandlers,
  ...memberHandlers,
]