import { rootRoute } from '@/routeTree'
import { socket } from '@/socket'
import { createRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const component = function TestPage() {
    const [isConnected, setIsConnected] = useState(socket.connected)

    useEffect(() => {
        function onConnect() {
            setIsConnected(true)
        }

        function onDisconnect() {
            setIsConnected(false)
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('message', data => {
            alert('HELLOO')
            console.log(data)
        })

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('message')
        }
    }, [])

    return (
        <div className='App'>
            <ConnectionState isConnected={isConnected} />
            <ConnectionManager />
        </div>
    )
}

export const TestRoute = createRoute({
    path: '/test',
    getParentRoute: () => rootRoute,
    component,
})

export function ConnectionState({ isConnected }: any) {
    return <p>State: {'' + isConnected}</p>
}

export function Events({ events }: any) {
    return (
        <ul>
            {events.map((event: any, index: any) => (
                <li key={index}>{event}</li>
            ))}
        </ul>
    )
}

export function ConnectionManager() {
    function connect() {
        socket.connect()
    }

    function disconnect() {
        socket.disconnect()
    }

    return (
        <>
            <button onClick={connect}>Connect</button>
            <button onClick={disconnect}>Disconnect</button>
        </>
    )
}
