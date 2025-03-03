import { http, HttpResponse } from 'msw'
import { CreateMemberDto } from '@features/members/types'
import { mockMemberRepository } from '@features/members/repository'

export const memberHandlers = [
  // POST /members
  http.post('/members', async ({ request }) => {
    try {
      const data = await request.json() as CreateMemberDto
      await mockMemberRepository.createMember(data)
      return new HttpResponse(null, { status: 201 })
    } catch (error) {
      return new HttpResponse(null, { 
        status: 400,
        statusText: error instanceof Error ? error.message : 'Failed to create member'
      })
    }
  })
]