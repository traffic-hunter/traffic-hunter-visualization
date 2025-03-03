import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link } from "@tanstack/react-router"
import { AuthType, AUTH_TEXTS } from "@/features/members/constants/auth"

interface AuthFormProps {
    type: AuthType;
    onSubmit: (e: React.FormEvent) => void;
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
    const texts = AUTH_TEXTS[type];

    return (
        <div className="w-full max-w-[500px] px-4">
            <Card className="shadow-lg">
                <CardHeader className="space-y-6 text-center pb-8">
                    <img
                        src="https://placehold.co/150x60?text=Logo"
                        alt="Traffic Hunter Logo"
                        className="mx-auto w-[200px] h-auto"
                    />
                    <div className="space-y-3">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            {texts.title}
                        </h1>
                        {texts.subtitle && (
                            <p className="text-lg text-gray-600">{texts.subtitle}</p>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="pb-8">
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Email"
                                className="w-full h-12"
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                className="w-full h-12"
                            />
                        </div>
                        <Button type="submit" className="w-full h-12 mt-6" size="lg">
                            {texts.submitButton}
                        </Button>
                        <div className="text-center text-sm text-gray-500">
                            {texts.switchText}{" "}
                            <Link
                                to={texts.switchPath}
                                className="text-blue-600 hover:underline"
                            >
                                {texts.switchLink}
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}