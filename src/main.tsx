import { configAxios } from '@/api/defaults'
import env from '@/env'
import { routeTree } from '@/routeTree'
import '@/styles/index.css'
import '@/styles/reset.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactDOM from 'react-dom/client'

// load ENV file to memory
env.load()
configAxios()

// #region global declarations
declare global {
    function devLog(...msg: any[]): void
}

const _global = (window /* browser */ || global) /* node */ as any
_global.devLog = function (...msg: any[]) {
    if (process.env.NODE_ENV === 'development') {
        console.log('🧑‍💻 DEV MODE: ', ...msg)
    }
}
// #endregion

export const queryClient = new QueryClient()
export const router = createRouter({
    routeTree,
    context: { queryClient: queryClient },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
})

console.log(queryClient)

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