import { useMutation } from "@tanstack/react-query"
import { memberRepository } from "../repository"
import { useNavigate } from "@tanstack/react-router"
import type { CreateMemberDto, SignInDto } from "../types"
import { toast } from "sonner"

export function useAuth() {
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: (data: SignInDto) => memberRepository.signIn(data),
        onSuccess: () => {},
    })

    const signupMutation = useMutation({
        mutationFn: (data: CreateMemberDto) => memberRepository.createMember(data),
        onSuccess: () => {
            toast.success('Registration Completed!', {
                description: 'Redirecting to login page...',
                duration: 2000,
            });
            navigate({
                to: "/members/login",
                search: {
                    redirect: undefined
                }
            })
        },
    })

    const logout = async () => {
        try {
            await memberRepository.signOut()
            navigate({ 
                to: "/members/login",
                search: {
                    redirect: undefined
                }
            })
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return {
        login: (data: SignInDto, redirect?: string) => {
            loginMutation.mutate(data, {
                onSuccess: () => {
                    if (redirect) {
                        navigate({ to: redirect })
                    } else {
                        navigate({ to: "/" })
                    }
                }
            })
        },
        signup: signupMutation.mutate,
        logout,
        isLoading: loginMutation.isPending || signupMutation.isPending,
        error: loginMutation.error || signupMutation.error,
    }
}