import { ParseResponse } from '@/api/defaults'
import axios, { AxiosError, AxiosResponse } from 'axios'

export type Auth_VerifyTokenAdmin_Req = {
    token: string
}

export type Auth_VerifyTokenAdmin_Res = boolean

export async function Auth_VerifyTokenAdmin({ token }: Auth_VerifyTokenAdmin_Req) {
    return await axios
        .post<Auth_VerifyTokenAdmin_Res>('/auth/verify-token-admin', undefined, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            transformResponse: [
                ParseResponse,
                (res: any) => {
                    if ('data' in res) {
                        return Boolean(res.data)
                    } else {
                        return false
                    }
                },
            ],
        })
        .catch(error => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 500) {
                    return {
                        ...error.response,
                        data: false,
                    } as AxiosResponse<boolean>
                }
            }

            return {
                data: false,
                status: 500,
                statusText: 'Internal Server Error',
            } as AxiosResponse<boolean>
        })
}
