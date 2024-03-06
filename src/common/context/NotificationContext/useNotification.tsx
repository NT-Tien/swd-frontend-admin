import { NotificationContext, NotificationContextType } from '@/common/context/NotificationContext/NotificationContext'
import { useContext } from 'react'

export function useNotification(): NotificationContextType {
    const context = useContext(NotificationContext)

    if (!context) {
        throw new Error('useNotification must be used within a NotificationContextProvider')
    }

    return context
}
