import { getUrl } from '@/api/defaults'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type File_Show_Req = {
    path: string
}

export type File_Show_Res = Blob

export function File_Show({ path }: File_Show_Req) {
    if (path.startsWith('image/')) {
        // some idiot didn't format the image url
        path = path.substring(6, path.length)
    }
    return axios.get<File_Show_Res>(getUrl('file/show/' + encodeURIComponent(path)), {
        responseType: 'blob',
        validateStatus: () => true,
    })
}

export const query_File_Show = ({ path }: File_Show_Req) =>
    queryOptions({
        queryKey: ['file', [path]],
        queryFn: () => File_Show({ path }),
        select: data => data.data,
    })