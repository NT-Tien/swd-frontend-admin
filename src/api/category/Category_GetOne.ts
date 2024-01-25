import { getUrl } from '@/api/defaults'
import axios from 'axios'

export function Category_GetOne(id: string) {
    return axios.get(getUrl('category/get-one/' + encodeURIComponent(id)))
}
