import { notification } from 'antd'
import { NotificationInstance } from 'antd/es/notification/interface'
import { ReactNode, createContext } from 'react'

export type NotificationContextType = {
    notiApi: NotificationInstance
}

export const NotificationContext = createContext<NotificationContextType | null>(null)

type NotificationContextProviderProps = {
    children: ReactNode
}
export default function NotificationContextProvider({ children }: NotificationContextProviderProps) {
    const [api, contextHolder] = notification.useNotification()
    return (
        <>
            {contextHolder}
            <NotificationContext.Provider value={{ notiApi: api }}>{children}</NotificationContext.Provider>
        </>
    )
}
