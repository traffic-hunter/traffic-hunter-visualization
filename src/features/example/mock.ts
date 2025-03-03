import { http, HttpResponse } from 'msw'
import { CreateUserDto, UpdateUserDto } from '@features/users/types'
import { mockUserRepository } from '@features/users/repository'



export const userHandlers = [
  // GET /users
  http.get('/users', async () => {
    const users = await mockUserRepository.getUsers()
    return HttpResponse.json(users)
  }),

  // GET /users/:id
  http.get('/users/:id', async ({ params }) => {
    try {
      const user = await mockUserRepository.getUser(params.id as string)
      return HttpResponse.json(user)
    } catch (error) {
      return new HttpResponse(null, { 
        status: 404,
        statusText: error instanceof Error ? error.message : 'User not found'
      })
    }
  }),

  // POST /users
  http.post('/users', async ({ request }) => {
    const data = await request.json() as CreateUserDto
    const newUser = await mockUserRepository.createUser(data)
    return HttpResponse.json(newUser, { status: 201 })
  }),

  // POST /users/:id
  http.post('/users/:id', async ({ params, request }) => {
    try {
      const data = await request.json() as UpdateUserDto
      const user = await mockUserRepository.updateUser(params.id as string, data)
      return HttpResponse.json(user)
    } catch (error) {
      return new HttpResponse(null, { 
        status: 404,
        statusText: error instanceof Error ? error.message : 'User not found'
      })
    }
  }),

  // DELETE /users/:id
  http.delete('/users/:id', async ({ params }) => {
    try {
      await mockUserRepository.deleteUser(params.id as string)
      return new HttpResponse(null, { status: 204 })
    } catch (error) {
      return new HttpResponse(null, { 
        status: 404,
        statusText: error instanceof Error ? error.message : 'User not found'
      })
    }
  })
]