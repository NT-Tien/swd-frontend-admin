import { message } from 'antd'
import { MessageInstance } from 'antd/es/message/interface'
import { ReactNode, createContext } from 'react'

export type MessageContextType = {
    messageApi: MessageInstance
}
export const MessageContext = createContext<MessageContextType | null>(null)

type MessageContextProviderProps = {
    children: ReactNode
}
export function MessageContextProvider({ children }: MessageContextProviderProps) {
    const [messageApi, contextHolder] = message.useMessage()

    return (
        <>
            {contextHolder}
            <MessageContext.Provider value={{ messageApi }}>{children}</MessageContext.Provider>
        </>
    )
}
