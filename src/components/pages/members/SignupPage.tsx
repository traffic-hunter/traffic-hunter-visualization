import { AuthForm } from "./AuthForm"
import { AuthType } from "@/features/members/constants/auth"
import { FullPageLayout } from "@/components/layout/FullPageLayout"

export default function SignupPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <FullPageLayout>
            <AuthForm type={AuthType.SIGNUP} onSubmit={handleSubmit} />
        </FullPageLayout>
    );
}