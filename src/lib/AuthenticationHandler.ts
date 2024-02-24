import { Auth_VerifyTokenAdmin } from '@/api/auth/Auth_VerifyTokenAdmin'
import { AuthResponse } from '@/lib/types/AuthResponse'
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
    static login(data: AuthResponse): void {
        const expiryDate = new Date(new Date().getTime() + 2 * 60 * 60 * 1000) // 2 hours

        Cookies.set('token', data.token, {
            expires: expiryDate,
        })
        Cookies.set('token_email', data.profile.user.email, {
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
        Cookies.remove('token')
        Cookies.remove('token_email')
        this.memoryToken = undefined
    }

    static getCookieToken(): string | undefined {
        const currentToken = Cookies.get('token')
        return currentToken
    }

    static getMemoryToken(): string | undefined {
        return this.memoryToken
    }

    static clientVerifyToken() {
        const cookieToken = this.getCookieToken(),
            memoryToken = this.getMemoryToken()

        if (cookieToken === undefined || memoryToken === undefined || cookieToken !== memoryToken) {
            return false
        }

        // Check expiry date
        const payload = jwtDecode(cookieToken) as {
            exp: number
        }
        if (payload.exp * 1000 < new Date().getTime()) {
            return false
        }

        return true
    }

    static async serverVerifyToken() {
        const cookieToken = this.getCookieToken()
        if (cookieToken === undefined) return false

        const response = await Auth_VerifyTokenAdmin({ token: cookieToken })

        if (response.data === true) {
            this.memoryToken = cookieToken
            return true
        } else {
            return false
        }
    }

    static getEmail() {
        let currentEmail = Cookies.get('token_email')

        if (!currentEmail) {
            // decode token manually and insert into token_email cookie

            // * No idea if this works lmao

            // TODO FIX this shit

            const currentToken = this.getCookieToken()
            const decodedJwt = jwtDecode(currentToken || '') as {
                email: string
            }
            Cookies.set('token_email', decodedJwt.email)
            currentEmail = decodedJwt.email
        }

        return currentEmail
    }
}
