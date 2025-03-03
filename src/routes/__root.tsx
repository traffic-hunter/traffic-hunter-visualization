import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from 'sonner'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </>
  ),
})