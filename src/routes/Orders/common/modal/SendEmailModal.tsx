import { queryAccount_GetById } from '@/api/account/Account_GetById'
import { queryStaff_OrderDesigns_GetAll } from '@/api/staff/Staff_OrderDesigns_GetAll'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { queryClient } from '@/main'
import { mutationSendEmail } from '@/routes/Orders/OrderDesignList/util/mutationSendEmail'
import { OrderDesignViewRoute } from '@/routes/Orders/OrderDesignView'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Button, Card, Modal, Spin, Typography } from 'antd'
import { ReactNode, useState } from 'react'

type SendEmailModalProps = {
    children: ({ handleOpen }: { handleOpen: (orderId: string, email: string, isAccepting: boolean) => void }) => ReactNode
}

export default function SendEmailModal({ children }: SendEmailModalProps) {
    const [open, setOpen] = useState(false)
    const { messageApi } = useMessage()
    const [orderId, setOrderId] = useState<string | null>(null)
    const [accountId, setAccountId] = useState<string | null>(null)
    const [isAccepting, setIsAccepting] = useState<boolean | null>(null)
    const navigate = useNavigate()

    const {
        data: account,
        isLoading,
        isError,
        isSuccess,
    } = useQuery(queryAccount_GetById({ id: accountId!, enabled: !!accountId, gcTime: 1000 * 60 }))

    const SendEmailMutation = useMutation({
        mutationFn: mutationSendEmail,
        onSettled: () => {
            messageApi.destroy('send-email')
        },
        onSuccess: async () => {
            handleClose()
            setTimeout(() => {
                messageApi.success('Successfully sent email')
            }, 250)
            await queryClient.invalidateQueries(queryStaff_OrderDesigns_GetAll())
            navigate({
                replace: true,
                to: OrderDesignViewRoute.to,
                search: {
                    result: isAccepting ? 'accepted' : 'denied',
                },
                params: {
                    id: orderId!,
                },
            })
        },
        onError(error) {
            devLog('Error sending email: ', error.message)
            setTimeout(() => {
                messageApi.error('Something went wrong. Please try again.')
            }, 250)
        },
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Sending email...',
                key: 'send-email',
            })
        },
    })

    function handleOpen(orderId: string, email: string, isAccepting: boolean) {
        setOrderId(orderId)
        setAccountId(email)
        setIsAccepting(isAccepting)
        setOpen(true)
    }

    function handleClose() {
        setOrderId(null)
        setAccountId(null)
        setIsAccepting(null)
        setOpen(false)
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal
                title={
                    isAccepting
                        ? 'Please confirm that you want to accept this order.'
                        : 'Please confirm that you want to reject this order.'
                }
                open={open}
                onCancel={handleClose}
                footer={[
                    <Button key='close-update-order-price' onClick={handleClose}>
                        Cancel
                    </Button>,
                    <Button
                        key='update-order-price'
                        color='primary'
                        type='primary'
                        onClick={() => {
                            SendEmailMutation.mutateAsync({
                                orderId: orderId!,
                                userId: accountId!,
                                isAccepting: isAccepting ?? false,
                            })
                        }}
                        disabled={isLoading}
                        loading={SendEmailMutation.isPending}
                        danger={!isAccepting}
                    >
                        {isAccepting ? 'Accept' : 'Deny'}
                    </Button>,
                ]}
            >
                {isLoading && <Spin />}
                {isError && <Typography.Paragraph>Error fetching account data. Please reopen the dialog.</Typography.Paragraph>}
                {isSuccess && (
                    <Card>
                        An acceptance email will be sent to this address: <strong>{account.email}</strong>
                    </Card>
                )}
            </Modal>
        </>
    )
}
