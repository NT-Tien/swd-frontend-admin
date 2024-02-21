import { Product_SoftDelete } from '@/api/product/Product_SoftDelete'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { queryClient } from '@/main'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Button, Flex, Modal } from 'antd'
import { ReactNode, useState } from 'react'

type DisableProductModalProps = {
    children: ({ handleOpen }: { handleOpen: (productId: string) => void }) => ReactNode
}

export default function DisableProductModal({ children }: DisableProductModalProps) {
    const [open, setOpen] = useState(false)
    const [currentProductId, setCurrentProductId] = useState<string | null>(null)
    const { messageApi } = useMessage()
    const navigate = useNavigate()

    const disableProductMutation = useMutation({
        mutationFn: Product_SoftDelete,
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Disabling Product',
                key: 'disabling-product',
            })
        },
        onSettled: () => {
            messageApi.destroy('disabling-product')
        },
        onSuccess: () => {
            setTimeout(
                () =>
                    messageApi.success({
                        content: (
                            <Flex gap={10}>
                                <span>Product disabled successfully.</span>
                                <Button
                                    type='dashed'
                                    onClick={() => navigate({ to: ProductListRoute.to, search: { tab: 'disabled', page: 0 } })}
                                >
                                    View Deleted
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
            setTimeout(() => messageApi.error('Error disabling product. Please try again.'), 250)
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
        disableProductMutation.mutate({
            id: currentProductId!,
        })
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal
                open={open}
                onCancel={handleClose}
                title='Disable Product'
                footer={[
                    <Button onClick={handleClose}>Cancel</Button>,
                    <Button type='primary' danger onClick={handleOk} loading={disableProductMutation.isPending}>
                        Disable
                    </Button>,
                ]}
            >
                Are you sure you want to disable this product?
            </Modal>
        </>
    )
}
