import { Product_Delete } from '@/api/product/Product_Delete'
import { queryClient } from '@/router'
import { useMutation } from '@tanstack/react-query'
import { Button, Modal, message } from 'antd'
import { ReactNode, useState } from 'react'

type DeleteProductModal = {
    children: ({ handleOpen }: { handleOpen: (productId: string) => void }) => ReactNode
}

export default function DeleteProductModal({ children }: DeleteProductModal) {
    const [messageApi, contextHolder] = message.useMessage()
    const [open, setOpen] = useState(false)
    const [currentProductId, setCurrentProductId] = useState<string>('')
    const deleteProduct = useMutation({
        mutationFn: () => Product_Delete({ id: currentProductId }),
    })

    function handleOpen(productId: string) {
        setCurrentProductId(productId)
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }
    async function handleOk() {
        try {
            await deleteProduct.mutateAsync()
            if (deleteProduct.isSuccess) {
                handleClose()
                messageApi.success('Product deleted successfully')
                queryClient.invalidateQueries({
                    queryKey: ['products'],
                })
            } else {
                messageApi.error('Product could not be deleted')
            }
        } catch (err) {
            messageApi.error("Couldn't delete product")
        }
    }

    return (
        <>
            {contextHolder}
            {children({ handleOpen })}
            <Modal
                open={open}
                onCancel={handleClose}
                onOk={handleOk}
                title='Delete Product'
                footer={[
                    <Button key='cancel' onClick={handleClose}>
                        Cancel
                    </Button>,
                    <Button key='delete' type='primary' danger onClick={handleOk}>
                        Delete
                    </Button>,
                ]}
            >
                Are you sure you want to delete this product?
            </Modal>
        </>
    )
}
