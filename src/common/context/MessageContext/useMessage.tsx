import { MessageContext, MessageContextType } from '@/common/context/MessageContext/MessageContext'
import { useContext } from 'react'

export function useMessage(): MessageContextType {
    const context = useContext(MessageContext)

    if (!context) {
        throw new Error('useMessage must be used within a MessageContextProvider')
    }

    return context
}
