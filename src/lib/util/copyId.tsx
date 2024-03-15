import { CopyFilled } from '@ant-design/icons'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import { MessageInstance } from 'antd/es/message/interface'

export function copyId(id: string, messageApi: MessageInstance): MenuItemType {
    return {
        label: 'Copy ID',
        icon: <CopyFilled />,
        onClick: () => {
            navigator.clipboard.writeText(id)
            messageApi.success('ID Copied to Clipboard')
        },
        key: 'copy-id',
    }
}
