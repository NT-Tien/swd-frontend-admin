import { useMessage } from '@/common/context/MessageContext/useMessage'
import { MutationFunction, useMutation } from '@tanstack/react-query'
import { Button, Modal } from 'antd'
import { ReactNode, useState } from 'react'

type DeleteModalProps = {
    title: string
    children: ({ handleOpen }: { handleOpen: (id: string) => void }) => ReactNode
    mutationFn: MutationFunction<any, { id: string }>
    afterSuccess?: () => void
}

export default function DeleteModal({ title, children, mutationFn, afterSuccess }: DeleteModalProps) {
    const [open, setOpen] = useState(false)
    const [id, setId] = useState('')
    const { messageApi } = useMessage()

    const deleteMutation = useMutation({
        mutationFn: mutationFn,
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: `Deleting ${title}...`,
                key: `deleting-${title}`,
            })
        },
        onSuccess: () => {
            handleClose()
            setTimeout(() => {
                messageApi.success(
                    <span
                        style={{
                            textTransform: 'capitalize',
                        }}
                    >
                        {title} deleted successfully
                    </span>,
                )
            }, 250)
            afterSuccess && afterSuccess()
        },
        onError: error => {
            devLog(`Error deleting ${title}: `, error.message)
            setTimeout(() => {
                messageApi.error('Something went wrong. Please try again.')
            }, 250)
        },
        onSettled: () => {
            messageApi.destroy(`deleting-${title}`)
        },
    })

    function handleOpen(id: string) {
        setId(id)
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
        setId('')
    }

    function handleOk() {
        deleteMutation.mutate({ id })
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal
                open={open}
                onCancel={handleClose}
                onOk={handleOk}
                title={`Delete ${title}`}
                footer={[
                    <Button onClick={handleClose}>Cancel</Button>,
                    <Button type='primary' danger onClick={handleOk} loading={deleteMutation.isPending}>
                        Delete
                    </Button>,
                ]}
            >
                Are you sure you want to delete this {title}?
            </Modal>
        </>
    )
}
