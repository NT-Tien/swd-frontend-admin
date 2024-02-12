import { Optional_Delete } from '@/api/option-product/Optional_Delete'
import { queryOptional_GetByProductId } from '@/api/option-product/Optional_GetByProductId'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { queryClient } from '@/main'
import { useMutation } from '@tanstack/react-query'
import { Button, Modal } from 'antd'
import { ReactNode, useState } from 'react'

type DeleteOptionalProductModal = {
    children: ({ handleOpen }: { handleOpen: (optionalProductId: string) => void }) => ReactNode
    productId: string
}

export default function DeleteOptionalProductModal({ children, productId }: DeleteOptionalProductModal) {
    const { messageApi } = useMessage()
    const [open, setOpen] = useState(false)
    const [id, setId] = useState<string>('')

    const deleteOptionalProductMutation = useMutation({
        mutationFn: Optional_Delete,
        onSuccess: () => {
            messageApi.success('Optional product deleted successfully')
            queryClient.invalidateQueries({
                queryKey: queryOptional_GetByProductId({ productId }).queryKey,
            })
        },
        onError: () => {
            messageApi.error('Failed to delete optional product')
        },
    })

    function handleOpen(optionalProductId: string) {
        setId(optionalProductId)
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }
    async function handleOk() {
        await deleteOptionalProductMutation.mutateAsync({
            id,
        })
        handleClose()
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal
                open={open}
                onCancel={handleClose}
                onOk={handleOk}
                title='Delete Product'
                footer={[
                    <Button onClick={handleClose}>Cancel</Button>,
                    <Button type='primary' danger onClick={handleOk} loading={deleteOptionalProductMutation.isPending}>
                        Delete
                    </Button>,
                ]}
            >
                <p>Are you sure you want to delete this optional product?</p>
            </Modal>
        </>
    )
}
