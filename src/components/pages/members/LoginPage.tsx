import { AuthForm } from "./AuthForm"
import { AuthType } from "@/features/members/constants/auth"
import { FullPageLayout } from "@/components/layout/FullPageLayout"

export default function LoginPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <FullPageLayout>
            <AuthForm type={AuthType.LOGIN} onSubmit={handleSubmit} />
        </FullPageLayout>
    );
}