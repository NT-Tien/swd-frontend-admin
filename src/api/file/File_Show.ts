import { getUrl } from '@/api/defaults'
import axios from 'axios'

export type File_Show_Response = string

export function File_Show(path: string) {
    return axios.get<File_Show_Response>(
        getUrl('file/show/' + encodeURIComponent(path)),
    )
}
