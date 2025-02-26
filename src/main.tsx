import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { mockService } from '@core/msw/setup'
import { router } from '@core/config/router'
import { queryClient } from '@core/config/query'
import './index.css'

mockService
  .initialize()
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StrictMode>
    )
  })
  .catch((error) => {
    console.error('Failed to start the application:', error)
  })
