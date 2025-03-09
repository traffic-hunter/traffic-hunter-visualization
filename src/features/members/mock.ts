import { http, HttpResponse } from 'msw'
import { CreateMemberRequestDto, SignInRequestDto, UpdateMemberRequestDto } from '@features/members/types'
import { mockMemberRepository } from '@features/members/repository'
import { httpProblemResponseFactory } from '@core/msw/utils/HttpProblemResponseFactory'

export const memberHandlers = [
  // POST /members
  http.post('/members', async ({ request }) => {
    try {
      const data = await request.json() as CreateMemberRequestDto
      await mockMemberRepository.createMember(data)
      return new HttpResponse(null, { status: 201 })
    } catch (error) {
      return httpProblemResponseFactory.badRequest(
        error instanceof Error ? error.message : 'Failed to create member',
        '/members'
      )
    }
  }),

  // GET /members/me
  http.get('/members/me', async () => {
    try {
      const response = await mockMemberRepository.getCurrentMember()
      return new HttpResponse(JSON.stringify(response), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      return httpProblemResponseFactory.unauthorized(
        error instanceof Error ? error.message : 'Not authenticated',
        '/members/me'
      )
    }
  }),

  // POST /members/sign-in
  http.post('/members/sign-in', async ({ request }) => {
    try {
      const data = await request.json() as SignInRequestDto
      const response = await mockMemberRepository.signIn(data)
      return new HttpResponse(JSON.stringify(response), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      return httpProblemResponseFactory.unauthorized(
        error instanceof Error ? error.message : 'Invalid credentials',
        '/members/sign-in'
      )
    }
  }),

  // GET /members/:id
  http.get('/members/:id', async ({ params }) => {
    try {
      const response = await mockMemberRepository.getMember(params.id as string)
      return new HttpResponse(JSON.stringify(response), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      return httpProblemResponseFactory.notFound(
        error instanceof Error ? error.message : 'Member not found',
        `/members/${params.id}`
      )
    }
  }),

  // GET /members
  http.get('/members', async () => {
    try {
      const response = await mockMemberRepository.getMembers()
      return new HttpResponse(JSON.stringify(response), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      return httpProblemResponseFactory.unauthorized(
        error instanceof Error ? error.message : 'Unauthorized',
        '/members'
      )
    }
  }),

  // POST /members/sign-out
  http.post('/members/sign-out', async () => {
    try {
      await mockMemberRepository.signOut()
      return new HttpResponse(null, { status: 200 })
    } catch (error) {
      return httpProblemResponseFactory.unauthorized(
        error instanceof Error ? error.message : 'Unauthorized',
        '/members/sign-out'
      )
    }
  }),

  // PUT /members
  http.put('/members', async ({ request }) => {
    try {
      const memberId = request.headers.get('Member')
      if (!memberId) {
        return httpProblemResponseFactory.badRequest(
          'Member ID is required',
          '/members'
        )
      }

      const data = await request.json() as UpdateMemberRequestDto
      await mockMemberRepository.updateMember(memberId, data)
      return new HttpResponse(null, { status: 200 })
    } catch (error) {
      return httpProblemResponseFactory.unauthorized(
        error instanceof Error ? error.message : 'Unauthorized',
        '/members'
      )
    }
  }),

  // DELETE /members
  http.delete('/members', async ({ request }) => {
    try {
      const memberId = request.headers.get('Member')
      if (!memberId) {
        return httpProblemResponseFactory.badRequest(
          'Member ID is required',
          '/members'
        )
      }

      await mockMemberRepository.deleteMember(memberId)
      return new HttpResponse(null, { status: 200 })
    } catch (error) {
      return httpProblemResponseFactory.unauthorized(
        error instanceof Error ? error.message : 'Unauthorized',
        '/members'
      )
    }
  })
]