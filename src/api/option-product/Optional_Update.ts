// TODO Parse Response

import { getUrl } from '@/api/defaults'
import axios from 'axios'

export type Optional_Update_Request_Payload = {
    name: string
    material: string
    price: number
    quantity: number
}

export function Optional_Update(
    id: string,
    payload: Optional_Update_Request_Payload,
) {
    return axios.put(getUrl('update/' + encodeURIComponent(id)), payload)
}
