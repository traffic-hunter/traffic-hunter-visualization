import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link } from "@tanstack/react-router"
import { AuthType, AUTH_TEXTS } from "../constants/auth"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="shadow-lg backdrop-blur-sm bg-white/90 border-2">
                <CardHeader className="space-y-6 text-center pb-8">
                    <motion.img
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        src="https://placehold.co/150x60?text=Logo"
                        alt="Traffic Hunter Logo"
                        className="mx-auto w-[200px] h-auto"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-3"
                    >
                        <h1 className="text-2xl font-semibold text-gray-800">
                            {texts.title}
                        </h1>
                        {texts.subtitle && (
                            <p className="text-lg text-gray-600">{texts.subtitle}</p>
                        )}
                    </motion.div>
                </CardHeader>
                <CardContent className="pb-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400"
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
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Button
                                type="submit"
                                className="w-full transition-all duration-200 hover:scale-[1.02]"
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : texts.submitButton}
                            </Button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-center text-sm text-gray-500"
                        >
                            {texts.switchText}{" "}
                            <Link
                                to={texts.switchPath}
                                className="text-blue-600 hover:underline"
                            >
                                {texts.switchLink}
                            </Link>
                        </motion.div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    )
}