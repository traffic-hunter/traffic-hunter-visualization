import { AuthForm } from "@/features/members/components/AuthForm"
import { AuthType } from "@/features/members/constants/auth"
import { FullPageLayout } from "@/components/layout/FullPageLayout"
import { useAuth } from "@/features/members/hooks/useAuth"
import { useSearch } from "@tanstack/react-router"
import type { AuthFormData } from "@/features/members/components/AuthForm"
import { AnimatePresence } from "framer-motion"

export default function LoginPage() {
    const { login, isLoading, error } = useAuth()
    const { redirect } = useSearch({
        from: '/members/login'
    })

    const handleSubmit = (data: AuthFormData) => {
        login(data, redirect)
    }

    return (
        <FullPageLayout>
            <div className="w-full max-w-[500px] px-4">
                <AnimatePresence mode="wait">
                    <AuthForm
                        type={AuthType.LOGIN}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        error={error?.message}
                    />
                </AnimatePresence>
            </div>
        </FullPageLayout>
    )
}