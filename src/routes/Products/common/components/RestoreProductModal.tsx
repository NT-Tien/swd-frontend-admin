import Product_Restore from '@/api/product/Product_Restore'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { queryClient } from '@/main'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Button, Flex, Modal } from 'antd'
import { ReactNode, useState } from 'react'

type RestoreProductModalProps = {
    children: ({ handleOpen }: { handleOpen: (productId: string) => void }) => ReactNode
}

export default function RestoreProductModal({ children }: RestoreProductModalProps) {
    const [open, setOpen] = useState(false)
    const [currentProductId, setCurrentProductId] = useState<string | null>(null)
    const { messageApi } = useMessage()
    const navigate = useNavigate()

    const restoreProductMutation = useMutation({
        mutationFn: Product_Restore,
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Restoring Product',
                key: 'restoring-product',
            })
        },
        onSettled: () => {
            messageApi.destroy('restoring-product')
        },
        onSuccess: () => {
            setTimeout(
                () =>
                    messageApi.success({
                        content: (
                            <Flex gap={10}>
                                <span>Product Restored successfully.</span>
                                <Button
                                    type='dashed'
                                    onClick={() => navigate({ to: ProductListRoute.to, search: { tab: 'all', page: 0 } })}
                                >
                                    View
                                </Button>
                            </Flex>
                        ),
                    }),
                250,
            )
            queryClient.invalidateQueries({
                queryKey: ['products'],
            })
            queryClient.invalidateQueries({
                queryKey: ['products-deleted'],
            })
            handleClose()
        },
        onError: error => {
            setTimeout(() => messageApi.error('Error restoring product. Please try again.'), 250)
            devLog(error)
        },
    })

    function handleOpen(productId: string) {
        setOpen(true)
        setCurrentProductId(productId)
    }

    function handleClose() {
        setOpen(false)
        setCurrentProductId(null)
    }

    function handleOk() {
        restoreProductMutation.mutate({
            id: currentProductId!,
        })
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal
                open={open}
                onCancel={handleClose}
                title='Restore Product'
                footer={[
                    <Button onClick={handleClose}>Cancel</Button>,
                    <Button type='primary' danger onClick={handleOk} loading={restoreProductMutation.isPending}>
                        Restore
                    </Button>,
                ]}
            >
                Are you sure you want to restore this product?
            </Modal>
        </>
    )
}
