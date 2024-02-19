import { InboxOutlined } from '@ant-design/icons'
import { Button, Form, Modal, Typography, Upload, UploadFile } from 'antd'
import { ReactNode, useState } from 'react'

type FieldType = {
    file: UploadFile<any>[]
}

type ImportCategoriesModalProps = {
    children: ({ handleOpen }: { handleOpen: () => void }) => ReactNode
}

export default function ImportCategoriesModal({ children }: ImportCategoriesModalProps) {
    const [open, setOpen] = useState(false)
    // const [data, setData] = useState('')

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function handleFinish() {
        console.log('FINISHING')
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
                <Form onFinish={handleFinish}>
                    <Form.Item<FieldType> name='file' label='File' getValueFromEvent={e => e && e.fileList}>
                        <Upload.Dragger multiple={false} accept='.json' beforeUpload={() => false} maxCount={1}>
                            <p className='ant-upload-drag-icon'>
                                <InboxOutlined />
                            </p>
                            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                        </Upload.Dragger>
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form>
            </Modal>
        </>
    )
}
