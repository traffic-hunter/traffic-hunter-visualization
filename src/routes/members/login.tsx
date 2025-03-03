import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '../../components/pages/members/LoginPage'

export const Route = createFileRoute('/members/login')({
    component: LoginPage,
})