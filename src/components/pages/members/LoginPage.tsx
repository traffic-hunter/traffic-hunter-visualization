import { AuthForm } from "@/features/members/components/AuthForm"
import { AuthType } from "@/features/members/constants/auth"
import { FullPageLayout } from "@/components/layout/FullPageLayout"
import { useAuth } from "@/features/members/hooks/useAuth"
import type { AuthFormData } from "@/features/members/components/AuthForm"

export default function LoginPage() {
    const { login, isLoading, error } = useAuth()

    const handleSubmit = (data: AuthFormData) => {
        login(data)
    }

    return (
        <FullPageLayout>
            <div className="w-full max-w-[500px] px-4">
                <AuthForm
                    type={AuthType.LOGIN}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    error={error?.message}
                />
            </div>
        </FullPageLayout>
    )
}