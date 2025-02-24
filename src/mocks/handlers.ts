import { http, HttpResponse } from 'msw'

export const handlers = [
  // Example handler
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      id: '1',
      name: 'John Doe',
      email: 'test@example.com'
    })
  })
]