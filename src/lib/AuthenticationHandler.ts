import { AuthResponse } from '@/lib/types/AuthResponse'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export default class AuthenticationHandler {
    static login(data: AuthResponse) {
        const expiryDate = new Date(new Date().getTime() + 2 * 60 * 60 * 1000) // 2 hours

        Cookies.set('token', data.token, {
            expires: expiryDate,
        })
        Cookies.set('token_email', data.account.email, {
            expires: expiryDate,
        })
    }

    static logout() {
        Cookies.set('token', '')
        Cookies.set('token_email', '')
        Cookies.remove('token')
        Cookies.remove('token_email')
    }

    static getToken() {
        const currentToken = Cookies.get('token')

        if (!currentToken) {
            throw new Error('No token found')
        }

        return currentToken
    }

    static getEmail() {
        let currentEmail = Cookies.get('token_email')
        const currentToken = this.getToken()

        if (!currentEmail) {
            // decode token manually and insert into token_email cookie

            // * No idea if this works lmao

            const decodedJwt = jwtDecode(currentToken) as {
                email: string
            }
            Cookies.set('token_email', decodedJwt.email)
            currentEmail = decodedJwt.email
        }

        return currentEmail
    }
}
