import { getUrl } from '@/api/defaults'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type File_ShowPDF_Req = {
    path: string
}

export type File_ShowPDF_Res = Blob

export function File_ShowPDF({ path }: File_ShowPDF_Req) {
    if (path.startsWith('image/')) {
        // some idiot didn't format the image url
        path = path.substring(6, path.length)
    }
    return axios.get<File_ShowPDF_Res>(getUrl('/file/show-pdf/' + encodeURIComponent(path)), {
        responseType: 'blob',
        validateStatus: () => true,
    })
}

export const query_File_ShowPDF = ({ path }: File_ShowPDF_Req) =>
    queryOptions({
        queryKey: ['file', [path]],
        queryFn: () => File_ShowPDF({ path }),
        select: data => data.data,
    })
