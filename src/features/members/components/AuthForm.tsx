import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link } from "@tanstack/react-router"
import { AuthType, AUTH_TEXTS } from "../constants/auth"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const authSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export type AuthFormData = z.infer<typeof authSchema>

interface AuthFormProps {
    type: AuthType
    onSubmit: (data: AuthFormData) => void
    isLoading?: boolean
    error?: string
}

export function AuthForm({ type, onSubmit, isLoading, error }: AuthFormProps) {
    const texts = AUTH_TEXTS[type]
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
    })

    return (
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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Input
                                type="email"
                                placeholder="Email"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : texts.submitButton}
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
    )
}