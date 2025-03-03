export enum AuthType {
    LOGIN = 'LOGIN',
    SIGNUP = 'SIGNUP'
}

interface AuthText {
    title: string;
    subtitle?: string;
    submitButton: string;
    switchText: string;
    switchLink: string;
    switchPath: string;
}

export const AUTH_TEXTS: Record<AuthType, AuthText> = {
    [AuthType.LOGIN]: {
        title: 'Welcome to Traffic Hunter APM',
        submitButton: 'Sign In',
        switchText: "Don't have an account?",
        switchLink: 'Sign up',
        switchPath: '/members/signup'
    },
    [AuthType.SIGNUP]: {
        title: 'Welcome to Traffic Hunter APM',
        subtitle: 'Sign Up',
        submitButton: 'Sign Up',
        switchText: 'Already have an account?',
        switchLink: 'Sign in',
        switchPath: '/members/login'
    }
} as const;