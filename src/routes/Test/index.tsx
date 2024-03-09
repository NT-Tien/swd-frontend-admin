import { rootRoute } from '@/routeTree'
import { createRoute } from '@tanstack/react-router'
import { useState } from 'react'

const blockSize = 100
const component = function TestPage() {
    const [leftMargin, setLeftMargin] = useState(0)
    const [topMargin, setTopMargin] = useState(0)

    return (
        <div
            style={{
                overflow: 'hidden',
                height: '100vh',
                backgroundSize: `${blockSize}px ${blockSize}px`,
                backgroundImage:
                    'linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)',
            }}
        >
            <span
                style={{
                    backgroundColor: 'red',
                    width: blockSize * 3,
                    height: blockSize * 3,
                    display: 'inline-grid',
                    placeItems: 'center',
                    marginLeft: `${leftMargin}px`,
                    marginTop: `${topMargin}px`,
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 600,
                }}
            >
                Hello
            </span>
        </div>
    )
}

export const TestRoute = createRoute({
    path: '/test',
    getParentRoute: () => rootRoute,
    component,
})
