import { getUrl } from '@/api/defaults'
import axios from 'axios'

export function Category_Delete(id: string) {
    return axios.delete(getUrl('category/delete/' + encodeURIComponent(id)))
}
