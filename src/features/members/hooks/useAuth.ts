import { useMutation } from "@tanstack/react-query"
import { memberRepository } from "../repository"
import { useNavigate } from "@tanstack/react-router"
import type { CreateMemberDto, SignInDto } from "../types"

export function useAuth() {
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: (data: SignInDto) => memberRepository.signIn(data),
        onSuccess: () => {
            navigate({ to: "/" })
        },
    })

    const signupMutation = useMutation({
        mutationFn: (data: CreateMemberDto) => memberRepository.createMember(data),
        onSuccess: () => {
            navigate({ to: "/members/login" })
        },
    })

    return {
        login: loginMutation.mutate,
        signup: signupMutation.mutate,
        isLoading: loginMutation.isPending || signupMutation.isPending,
        error: loginMutation.error || signupMutation.error,
    }
}