import { configAxios } from '@/api/defaults'
import LoadingComponent from '@/common/components/LoadingComponent'
import env from '@/env'
import { routeTree } from '@/routeTree'
import '@/socket'
import '@/styles/index.css'
import '@/styles/reset.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import utc from 'dayjs/plugin/utc'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import React from 'react'
import ReactDOM from 'react-dom/client'

// load ENV file to memory
env.load()
configAxios()
dayjs.extend(weekOfYear)
dayjs.extend(utc)
dayjs.extend(isToday)

// #region global declarations
declare global {
    function devLog(...msg: any[]): void
}

const _global = (window /* browser */ || global) /* node */ as any
_global.devLog = function (...msg: any[]) {
    if (import.meta.env.MODE === 'development') {
        console.log('🧑‍💻 DEV MODE: ', ...msg)
    }
}
// #endregion

export const queryClient = new QueryClient()
export const router = createRouter({
    routeTree,
    context: {
        queryClient: queryClient,
    },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: () => <LoadingComponent />,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools client={queryClient} />
        </QueryClientProvider>
    </React.StrictMode>,
)

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
