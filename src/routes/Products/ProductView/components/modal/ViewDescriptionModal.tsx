import { Modal, Typography } from 'antd'
import { ReactNode, useState } from 'react'

type ViewDescriptionModalProps = {
    children: ({ handleOpen }: { handleOpen: (d: string) => void }) => ReactNode
}

export default function ViewDescriptionModal({ children }: ViewDescriptionModalProps) {
    const [open, setOpen] = useState(false)
    const [description, setDescription] = useState('')

    function handleOpen(description: string) {
        setOpen(true)
        setDescription(description)
    }

    function handleClose() {
        setOpen(false)
        setDescription('')
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal open={open} onCancel={handleClose} title='Description' footer={null}>
                <Typography.Paragraph>{description}</Typography.Paragraph>
            </Modal>
        </>
    )
}
