import { http, HttpResponse } from 'msw'
import { CreateMemberDto, SignInDto, UpdateMemberDto } from '@features/members/types'
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
  }),

  // POST /members/sign-in
  http.post('/members/sign-in', async ({ request }) => {
    try {
      const data = await request.json() as SignInDto
      const response = await mockMemberRepository.signIn(data)
      return new HttpResponse(JSON.stringify(response), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      return new HttpResponse(null, {
        status: 401,
        statusText: error instanceof Error ? error.message : 'Invalid credentials'
      })
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
      return new HttpResponse(null, {
        status: 404,
        statusText: error instanceof Error ? error.message : 'Member not found'
      })
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
      return new HttpResponse(null, {
        status: 401,
        statusText: error instanceof Error ? error.message : 'Unauthorized'
      })
    }
  }),

  // POST /members/sign-out
  http.post('/members/sign-out', async () => {
    try {
      await mockMemberRepository.signOut()
      return new HttpResponse(null, { status: 200 })
    } catch (error) {
      return new HttpResponse(null, {
        status: 401,
        statusText: error instanceof Error ? error.message : 'Unauthorized'
      })
    }
  }),

  // PUT /members
  http.put('/members', async ({ request }) => {
    try {
      const memberId = request.headers.get('Member')
      if (!memberId) {
        return new HttpResponse(null, {
          status: 400,
          statusText: 'Member ID is required'
        })
      }

      const data = await request.json() as UpdateMemberDto
      await mockMemberRepository.updateMember(memberId, data)
      return new HttpResponse(null, { status: 200 })
    } catch (error) {
      return new HttpResponse(null, {
        status: 401,
        statusText: error instanceof Error ? error.message : 'Unauthorized'
      })
    }
  }),

  // DELETE /members
  http.delete('/members', async ({ request }) => {
    try {
      const memberId = request.headers.get('Member')
      if (!memberId) {
        return new HttpResponse(null, {
          status: 400,
          statusText: 'Member ID is required'
        })
      }

      await mockMemberRepository.deleteMember(memberId)
      return new HttpResponse(null, { status: 200 })
    } catch (error) {
      return new HttpResponse(null, {
        status: 401,
        statusText: error instanceof Error ? error.message : 'Unauthorized'
      })
    }
  })
]