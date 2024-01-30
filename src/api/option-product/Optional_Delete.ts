// TODO Parse response

import axios from 'axios'

export type Optional_Delete_Req = {
    id: string
}

export type Optional_Delete_Res = {
    success: boolean
}

export function Optional_Delete({ id }: Optional_Delete_Req) {
    return axios.delete('delete/' + encodeURIComponent(id))
}
