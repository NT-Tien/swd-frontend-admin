import { ParseResponse } from '@/api/defaults'
import axios, { AxiosError, AxiosResponse } from 'axios'

export type Auth_VerifyTokenStaff_Req = {
    token: string
}

export type Auth_VerifyTokenStaff_Res = boolean

export async function Auth_VerifyTokenStaff({ token }: Auth_VerifyTokenStaff_Req) {
    return await axios
        .post<Auth_VerifyTokenStaff_Res>('/auth/verify-token-staff', undefined, {
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
