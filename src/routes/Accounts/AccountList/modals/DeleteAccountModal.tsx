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
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Deleting account...',
                key: 'deleting-account',
            })
        },
        onSuccess: () => {
            handleClose()
            setTimeout(() => {
                messageApi.success('Account deleted successfully')
            }, 250)
            queryClient.invalidateQueries({
                queryKey: ['accounts'],
            })
        },
        onError: error => {
            devLog('Error deleting account: ', error.message)
            setTimeout(() => {
                messageApi.error('Something went wrong. Please try again.')
            }, 250)
        },
        onSettled: () => {
            messageApi.destroy('deleting-account')
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
                    <Button type='primary' danger onClick={handleOk} loading={deleteAccountMutation.isPending}>
                        Delete
                    </Button>,
                ]}
            >
                Are you sure you want to delete this account?
            </Modal>
        </>
    )
}
