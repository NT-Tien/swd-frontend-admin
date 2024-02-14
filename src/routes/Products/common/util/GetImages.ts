import { query_File_Show } from '@/api/file/File_Show'
import { queryClient } from '@/main'

export async function GetImages(imageLinks: string[]): Promise<string[]> {
    const promises = imageLinks.map(async img => {
        const res = await queryClient.ensureQueryData(query_File_Show({ path: img }))
        return URL.createObjectURL(res.data)
    })

    return await Promise.all(promises)
}
