import { createRouter } from '@tanstack/react-router'
import { routeTree } from '../../routeTree.gen'

export const createAppRouter = () => {
  return createRouter({ routeTree })
}

export const router = createAppRouter()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}