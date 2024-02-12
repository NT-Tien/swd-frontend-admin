import env from '@/env'
import axios from 'axios'

export function configAxios() {
    axios.defaults.baseURL = env.BACKEND_URL

    axios.interceptors.request.use(
        config => {
            devLog(
                `Sending request to ${config.url} (${config.auth ? 'auth' : 'no auth'}). ${config.data ? 'Request Body:' : ''}`,
                config.data ? config.data : '',
            )

            return config
        },
        error => {
            devLog('Error while sending request', error)
            throw error
        },
    )

    axios.interceptors.response.use(
        response => {
            devLog(
                `Received response from ${response.config.url}. ${response.data ? 'Response body:' : ''}`,
                response.data ? response.data : '',
            )

            return response
        },
        error => {
            devLog('Error while receiving response', error)
            throw error
        },
    )
}

export function getUrl(url: string) {
    if (url.startsWith('/')) url = url.substring(1, url.length)

    return env.BACKEND_URL + '/' + url
}

export function ParseResponse(data: any) {
    if (!data) throw new Error('No data received')
    return JSON.parse(data) as ApiResponse<any>
}