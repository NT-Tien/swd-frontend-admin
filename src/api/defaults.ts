import env from '@/env'

export function getUrl(url: string) {
    if (url.startsWith('/')) url = url.substring(1, url.length)

    return env.BACKEND_URL + '/' + url
}
