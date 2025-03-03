import { createFileRoute } from '@tanstack/react-router'
import HomePage from '@/components/pages/home/HomePage'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { FullPageLayout } from '@/components/layout/FullPageLayout'

export const Route = createFileRoute('/')({
  component: () => (
    <ProtectedRoute>
      <FullPageLayout>
        <HomePage />
      </FullPageLayout>
    </ProtectedRoute>
  )
})