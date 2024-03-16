import { Auth_VerifyTokenAdmin } from '@/api/auth/Auth_VerifyTokenAdmin'
import { Auth_VerifyTokenDStaff } from '@/api/auth/Auth_VerifyTokenDStaff'
import { Auth_VerifyTokenStaff } from '@/api/auth/Auth_VerifyTokenStaff'
import { Role, isAuthorized } from '@/lib/types/Account'
import { AuthResponse } from '@/lib/types/AuthResponse'
import { LoginRoute } from '@/routes/Login'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export default class AuthenticationHandler {
    private static memoryToken: string | undefined

    /**
     * This function logs the user in by setting cookies.
     * Note, this function does not authorize the token, and as such, does not assign the memory token (token to be used throughout session)
     *
     * @param data response from Auth_LoginGoogle.ts
     * @returns Cookies token and token_email are set
     */
    static async login(data: AuthResponse): Promise<void> {
        const expiryDate = new Date(new Date().getTime() + 2 * 60 * 60 * 1000) // 2 hours

        Cookies.set('token', data.token, {
            expires: expiryDate,
        })
        Cookies.set('token_email', data.profile.user.email, {
            expires: expiryDate,
        })
        Cookies.set('role', data.profile.user.role, {
            expires: expiryDate,
        })
    }

    /**
     * This function clears all cookies, and clears the memory token.
     * Thus, after running, any movement to a new page will redirect to the login screen
     */
    static logout(): void {
        Cookies.set('token', '')
        Cookies.set('token_email', '')
        Cookies.set('role', '')
        Cookies.remove('token')
        Cookies.remove('token_email')
        Cookies.remove('role')
        this.memoryToken = undefined
    }

    static getMemoryToken(): string | undefined {
        if (this.memoryToken === undefined) {
            devLog('MEMORY TOKEN NOT FOUND')
        }

        return this.memoryToken
    }

    static getCookieToken(): string | undefined {
        const currentToken = Cookies.get('token')

        if (currentToken === undefined) {
            devLog('COOKIE TOKEN NOT FOUND')
        }

        return currentToken
    }

    static getCurrentRole(): Role | undefined {
        const role = Cookies.get('role') as Role
        if (role === undefined) {
            devLog('ROLE NOT FOUND')
        }

        return role
    }

    private static clientVerifyToken(role: Role): boolean {
        const cookieToken = this.getCookieToken(),
            memoryToken = this.getMemoryToken(),
            currentRole = this.getCurrentRole()

        if (cookieToken === undefined || memoryToken === undefined || currentRole === undefined || cookieToken !== memoryToken) {
            devLog('TOKEN MISMATCH')
            return false
        }

        if (!isAuthorized(role, currentRole)) {
            devLog('ROLE MISMATCH')
            return false
        }

        // Check expiry date
        const payload = jwtDecode(cookieToken) as {
            exp: number
        }
        if (payload.exp * 1000 < new Date().getTime()) {
            devLog('TOKEN EXPIRED')
            return false
        }

        return true
    }

    private static async serverVerifyToken(role: Role): Promise<boolean> {
        const cookieToken = this.getCookieToken()
        if (cookieToken === undefined) {
            return false
        }

        let response

        switch (role) {
            case Role.ADMIN:
                response = await Auth_VerifyTokenAdmin({ token: cookieToken })
                break
            case Role.STAFF:
                response = await Auth_VerifyTokenStaff({ token: cookieToken })
                break
            case Role.DSTAFF:
                response = await Auth_VerifyTokenDStaff({ token: cookieToken })
                break;
            default:
                response = await Auth_VerifyTokenAdmin({ token: cookieToken })
                break
        }

        if (response.data === true) {
            this.memoryToken = cookieToken
            return true
        } else {
            devLog('SERVER TOKEN VERIFICATION FAILED: INVALID')
            return false
        }
    }

    static getEmail() {
        let currentEmail = Cookies.get('token_email')

        if (!currentEmail) {
            // decode token manually and insert into token_email cookie

            // * No idea if this works lmao
            const currentToken = this.getCookieToken()
            if (!currentToken) {
                return 'placeholder@email.com'
            }
            const decodedJwt = jwtDecode(currentToken) as {
                email: string
            }
            Cookies.set('token_email', decodedJwt.email)
            currentEmail = decodedJwt.email
        }

        return currentEmail
    }

    static async authorize(role: Role, onError: (loginRoute?: string) => void, logoutOnError: boolean = true) {
        if (this.clientVerifyToken(role)) {
            devLog('Quick Auth Success')
            return true
        } else {
            if (await this.serverVerifyToken(role)) {
                devLog('Slow Auth Success')
                return true
            } else {
                if (logoutOnError) {
                    this.logout()
                }
                onError(LoginRoute.to)
            }
        }
    }
}
