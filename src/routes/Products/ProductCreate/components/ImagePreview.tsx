import { Modal, UploadFile } from 'antd'
import { ReactNode, useState } from 'react'

type ImagePreviewProps = {
    children: ({
        handleOpen,
    }: {
        handleOpen: (imageSrc: UploadFile<any>) => void
    }) => ReactNode
}

export default function ImagePreview({ children }: ImagePreviewProps) {
    const [open, setOpen] = useState(false)
    const [imageSrc, setImageSrc] = useState<UploadFile<any>>()

    function handleOpen(imageSrc: UploadFile<any>) {
        setOpen(true)
        setImageSrc(imageSrc)
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
                {imageSrc && (
                    <img
                        src={imageSrc.thumbUrl || imageSrc.url}
                        style={{
                            width: '100%',
                        }}
                    />
                )}
            </Modal>
        </>
    )
}
