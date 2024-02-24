import { Role } from '@/lib/types/Account'

export type AuthResponse = {
    token: string
    profile: {
        user: {
            email: string
            role: Role
        }
    }
}

export function ResponseToAuthResponse(response: Record<string, any>): AuthResponse {
    return {
        token: response.token,
        profile: {
            user: {
                email: response.profile.user.email,
                role: response.profile.user.role,
            },
        },
    } satisfies AuthResponse
}
