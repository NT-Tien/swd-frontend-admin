import UpdateOptionalProductForm from '@/routes/Products/ProductUpdate/components/UpdateOptionalProductForm'
import UpdateProductForm from '@/routes/Products/ProductUpdate/components/UpdateProductForm'
import { Modal, Tabs } from 'antd'
import { ReactNode, useState } from 'react'

type UpdateProductModalProps = {
    children: ({ handleOpen }: { handleOpen: (id: string) => void }) => ReactNode
}

export default function UpdateProductModal({ children }: UpdateProductModalProps) {
    const [productId, setProductId] = useState<string | null>(null)
    const [open, setOpen] = useState(false)

    function handleOpen(id: string) {
        setProductId(id)
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
        setProductId(null)
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal title='Update Product' open={open} onCancel={handleClose} footer={null} width={1000}>
                <Tabs
                    animated
                    items={[
                        {
                            key: 'update-product-modal-1',
                            label: 'Product Details',
                            children: productId && <UpdateProductForm productId={productId} />,
                        },
                        {
                            key: 'update-product-modal-2',
                            label: 'Optional Products',
                            children: productId && <UpdateOptionalProductForm productId={productId} />,
                        },
                    ]}
                />
            </Modal>
        </>
    )
}
