import { useMessage } from '@/common/context/MessageContext/useMessage'
import { mutationSendEmail } from '@/routes/Orders/OrderDesignList/util/mutationSendEmail'
import { useMutation } from '@tanstack/react-query'
import { Button, Modal } from 'antd'
import { ReactNode, useState } from 'react'

type SendEmailModalProps = {
    children: ({ handleOpen }: { handleOpen: (orderId: string, email: string) => void }) => ReactNode
}

export default function SendEmailModal({ children }: SendEmailModalProps) {
    const [open, setOpen] = useState(false)
    const { messageApi } = useMessage()
    const [orderId, setOrderId] = useState('')
    const [accountId, setAccountId] = useState('')

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
        },
        onError(error) {
            devLog('Error sending email: ', error.message)
            setTimeout(() => {
                messageApi.error('Something went wrong. Please try again.')
            }, 250)
        },
    })

    function handleOpen(orderId: string, email: string) {
        setOrderId(orderId)
        setAccountId(email)
        setOpen(true)
    }

    function handleClose() {
        setOrderId('')
        setAccountId('')
        setOpen(false)
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal
                title='Update Order price'
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
                                orderId,
                                userId: accountId,
                            })
                        }}
                        loading={SendEmailMutation.isPending}
                    >
                        Confirm
                    </Button>,
                ]}
            >
                Please confirm that you want to send an email to {accountId} for order {orderId}
            </Modal>
        </>
    )
}
