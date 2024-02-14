import { Modal, Typography } from 'antd'
import { ReactNode, useState } from 'react'

type ImportCategoriesModalProps = {
    children: ({ handleOpen }: { handleOpen: () => void }) => ReactNode
}

export default function ImportCategoriesModal({ children }: ImportCategoriesModalProps) {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(1)

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal open={open} onCancel={handleClose} title='Import Categories From JSON'>
                <Typography.Paragraph copyable>
                    <pre>
                        {`[
    {
        "name": "First category"
    },
    {
        "name": "Second category"
    },
    ...
]`}
                    </pre>
                </Typography.Paragraph>
            </Modal>
        </>
    )
}
