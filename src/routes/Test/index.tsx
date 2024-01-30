import { File_Upload } from '@/api/file/File_Upload'
import { rootRoute } from '@/router'
import { createRoute } from '@tanstack/react-router'
import { useState } from 'react'

const component = function TestPage() {
    const [file, setFile] = useState<File>()
    function handleChange(e: any) {
        setFile(e.target.files[0] as File)
    }

    async function handleClick() {
        const res = await File_Upload({
            fileBinary: file!,
        })

        console.log('RESPONSE:')
        console.log(res)
    }

    return (
        <div>
            <input type='file' onChange={handleChange} />
            <button onClick={handleClick}>CLICK</button>
        </div>
    )
}

export const TestRoute = createRoute({
    path: '/test',
    getParentRoute: () => rootRoute,
    component,
})
