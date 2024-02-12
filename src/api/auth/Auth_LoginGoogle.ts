import { ParseResponse } from '@/api/defaults'
import { AuthResponse, ResponseToAuthResponse } from '@/lib/types/AuthResponse'
import axios from 'axios'

type Auth_LoginGoogle_Req = {
    token: string
}

type Auth_LoginGoogle_Res = AuthResponse

export async function Auth_LoginGoogle(requestData: Auth_LoginGoogle_Req) {
    return axios.post<Auth_LoginGoogle_Res>('/auth/login/google', requestData, {
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<AuthResponse>) => {
                if ('data' in res) {
                    return ResponseToAuthResponse(res.data)
                } else {
                    // error
                    devLog('Error while logging in with Google', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
