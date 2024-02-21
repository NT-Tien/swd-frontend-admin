import { queryClient } from '@/main'
import { RetweetOutlined } from '@ant-design/icons'
import { Button, ButtonProps, Tooltip } from 'antd'

type RefreshButtonProps = {
    queryKey: string[]
    isLoading: boolean
} & ButtonProps

export default function RefreshButton({ queryKey, isLoading, ...otherProps }: RefreshButtonProps) {
    return (
        <Tooltip title='Refresh Data' showArrow={false} placement='right'>
            <Button
                size='middle'
                icon={<RetweetOutlined />}
                disabled={isLoading}
                onClick={() => {
                    queryClient.resetQueries({
                        queryKey: queryKey,
                    })
                }}
                style={{
                    marginInline: '10px',
                }}
                {...otherProps}
            ></Button>
        </Tooltip>
    )
}
