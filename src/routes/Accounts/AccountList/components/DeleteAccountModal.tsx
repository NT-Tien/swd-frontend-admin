import { Account_Delete } from '@/api/account/Account_Delete'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { queryClient } from '@/main'
import { useMutation } from '@tanstack/react-query'
import { Button, Modal } from 'antd'
import { ReactNode, useState } from 'react'

type DeleteAccountModalProps = {
    children: ({ handleOpen }: { handleOpen: (accountId: string) => void }) => ReactNode
}

export default function DeleteAccountModal({ children }: DeleteAccountModalProps) {
    const [open, setOpen] = useState(false)
    const [accountId, setAccountId] = useState('')
    const { messageApi } = useMessage()

    const deleteAccountMutation = useMutation({
        mutationFn: Account_Delete,
        onSuccess: () => {
            handleClose()
            messageApi.success('Account deleted successfully')
            queryClient.invalidateQueries({
                queryKey: ['accounts'],
            })
        },
        onError: error => {
            devLog('Error deleting account: ', error.message)
            messageApi.error('Something went wrong. Please try again.')
        },
    })

    function handleOpen(accountId: string) {
        setAccountId(accountId)
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
        setAccountId('')
    }

    function handleOk() {
        deleteAccountMutation.mutate({ id: accountId })
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal
                open={open}
                onCancel={handleClose}
                onOk={handleOk}
                title='Delete Category'
                footer={[
                    <Button onClick={handleClose}>Cancel</Button>,
                    <Button type='primary' danger onClick={handleOk}>
                        Delete
                    </Button>,
                ]}
            >
                Are you sure you want to delete this account?
            </Modal>
        </>
    )
}
