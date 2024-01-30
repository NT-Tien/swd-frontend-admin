import { toBinary } from '@/lib/util/toBinary'
import axios from 'axios'

export type File_Upload_Req = {
    fileBinary: File
}

export type File_Upload_Res = {
    path: string
}

export async function File_Upload({ fileBinary }: File_Upload_Req) {
    const formData = new FormData()
    const data = await toBinary(fileBinary)
    formData.append('file', data)

    return await axios.post<File_Upload_Res>('file/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
