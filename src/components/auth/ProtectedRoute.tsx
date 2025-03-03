import { Navigate, useLocation } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { memberRepository } from '@features/members/repository'

interface Props {
    children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
    const location = useLocation()

    const { isLoading, data: currentUser } = useQuery({
        queryKey: ['auth', 'me'],
        queryFn: () => memberRepository.getCurrentMember(),
        retry: false
    })

    if (isLoading) {
        return null
    }

    if (!currentUser) {
        return <Navigate to="/members/login" search={{ redirect: location.pathname }} />
    }

    return <>{children}</>
}