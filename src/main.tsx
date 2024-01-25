import { queryClient, router } from '@/router'
import '@/styles/index.css'
import { RouterProvider } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/reset.css'
import env from '@/env'
import { QueryClientProvider } from '@tanstack/react-query'

// load ENV file to memory
env.load()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>,
)
