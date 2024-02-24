import { useState } from 'react'

export default function useRefresh() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setState] = useState(false)

    function refresh() {
        setState(prev => !prev)
    }

    return refresh
}
