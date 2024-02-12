import { Role } from '@/lib/types/Account'

export type AuthResponse = {
    token: string
    account: {
        email: string
        role: Role
    }
}

export function ResponseToAuthResponse(response: Record<string, any>): AuthResponse {
    return {
        token: response.token,
        account: {
            email: response.account.email,
            role: response.account.role,
        },
    } satisfies AuthResponse
}
