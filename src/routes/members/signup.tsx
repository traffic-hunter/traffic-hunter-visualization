import { createFileRoute } from '@tanstack/react-router'
import SignupPage from '@components/pages/members/SignupPage'

export const Route = createFileRoute('/members/signup')({
    component: SignupPage,
})