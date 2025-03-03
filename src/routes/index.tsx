import { createFileRoute } from '@tanstack/react-router'
import HomePage from '@/components/pages/home/HomePage'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export const Route = createFileRoute('/')({
  component: () => (
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  )
})