import env from '@/env'
import axios from 'axios'

export function configAxios() {
    axios.defaults.baseURL = env.BACKEND_URL

    axios.interceptors.request.use(
        config => {
            env.APP_MODE === 'development' &&
                console.log(`Sending request to ${config.url} (${config.auth ? 'auth' : 'no auth'}) with body: ${config.data}`)

            return config
        },
        error => {
            console.error('Error while sending request', error)
        },
    )

    axios.interceptors.response.use(
        response => {
            env.APP_MODE === 'development' &&
                console.log(
                    `Received response from ${response.config.url} with status ${response.status}.
                    Response body: ${JSON.stringify(response.data, null, 2)}`,
                )

            return response
        },
        error => {
            console.error('Error while receiving response', error)
        },
    )
}

export function getUrl(url: string) {
    if (url.startsWith('/')) url = url.substring(1, url.length)

    return env.BACKEND_URL + '/' + url
}

export type ApiConfig =
    | {
          autoParse?: boolean
      }
    | undefined