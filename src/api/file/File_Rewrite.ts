import { getUrl } from '@/api/defaults'
import axios from 'axios'

export function File_Rewrite(path: string, fileBinary: string) {
    const formData = new FormData()
    formData.append('file', fileBinary)

    return axios.post(
        getUrl('file/rewrite/' + encodeURIComponent(path)),
        formData,
    )
}
