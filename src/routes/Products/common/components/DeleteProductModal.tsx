import { queryOptional_GetByProductId } from '@/api/option-product/Optional_GetByProductId'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { queryClient } from '@/main'
import { DeleteProductFull } from '@/routes/Products/common/util/DeleteProductFull'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Modal, Spin } from 'antd'
import { ReactNode, useState } from 'react'

type DeleteProductModal = {
    children: ({ handleOpen }: { handleOpen: (productId: string) => void }) => ReactNode
    afterDelete?: () => void
}

export default function DeleteProductModal({ children, afterDelete }: DeleteProductModal) {
    const { messageApi } = useMessage()
    const [open, setOpen] = useState(false)
    const [currentProductId, setCurrentProductId] = useState<string>('')
    const {
        data: optionalProducts,
        isLoading,
        isError,
        isSuccess,
    } = useQuery({
        ...queryOptional_GetByProductId({ productId: currentProductId }),
        enabled: !!currentProductId,
    })
    const deleteProduct = useMutation({
        mutationFn: () =>
            DeleteProductFull(
                currentProductId,
                optionalProducts?.map(op => op.id) ?? [], // I've disabled the button when optionalProducts is undefined
            ),
        onSuccess: () => {
            handleClose()
            messageApi.success('Product deleted successfully')
            queryClient.invalidateQueries({
                queryKey: ['products'],
            })
            afterDelete && afterDelete()
        },
        onError: error => {
            messageApi.error('Error deleting product')
            devLog('Error deleting product: ', error.message)
        },
    })

    function handleOpen(productId: string) {
        setCurrentProductId(productId)
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }
    async function handleOk() {
        await deleteProduct.mutateAsync()
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
                    <Button type='primary' danger onClick={handleOk} disabled={!isSuccess} loading={deleteProduct.isPending}>
                        Delete
                    </Button>,
                ]}
            >
                {isLoading && <Spin />}
                {isSuccess &&
                    (isError || optionalProducts.length === 0 ? (
                        <p>Are you sure you want to delete this product?</p>
                    ) : (
                        <p>
                            Warning, this product has{' '}
                            <strong>
                                {optionalProducts.length} optional product{optionalProducts.length !== 1 && 's'}
                            </strong>
                            . Deleting the product will delete all optional products.
                        </p>
                    ))}
            </Modal>
        </>
    )
}
