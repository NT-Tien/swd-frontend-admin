import { Image, Modal, Table } from 'antd'
import { ReactNode, useState } from 'react'

type ViewMoreImagesModalProps = {
    children: ({ handleOpen }: { handleOpen: (list: string[]) => void }) => ReactNode
}

export default function ViewMoreImagesModal({ children }: ViewMoreImagesModalProps) {
    const [open, setOpen] = useState(false)
    const [images, setImages] = useState<string[]>([])

    function handleOpen(imagesList: string[]) {
        setOpen(true)
        setImages(imagesList)
    }

    function handleClose() {
        setOpen(false)
        setImages([])
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal
                open={open}
                onCancel={handleClose}
                title='Product Images'
                width={1500}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 2fr)',
                    gap: '10px',
                }}
                mask
                footer={null}
            >
                <Table
                    dataSource={images.map((img, index) => ({
                        key: index,
                        image: img,
                    }))}
                    columns={[
                        {
                            title: 'No.',
                            dataIndex: 'key',
                            width: 50,
                        },
                        {
                            title: 'Image',
                            dataIndex: 'image',
                            render: (image: string) => (
                                <Image
                                    src={image}
                                    alt='Product Image'
                                    style={{
                                        width: '100px',
                                        objectFit: 'cover',
                                        aspectRatio: '1/1',
                                        borderRadius: '5px',
                                    }}
                                />
                            ),
                        },
                    ]}
                />
            </Modal>
        </>
    )
}
