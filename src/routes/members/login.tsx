import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '../../components/pages/members/LoginPage'

export const Route = createFileRoute('/members/login')({
    component: LoginPage,
    validateSearch: (search: Record<string, unknown>) => {
        let redirect: string | undefined = undefined

        if (typeof search.redirect === 'string') {
            redirect = search.redirect
        }

        return {
            redirect
        }
    }
})