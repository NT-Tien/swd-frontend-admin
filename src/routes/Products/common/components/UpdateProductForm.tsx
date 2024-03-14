import { queryCategory_GetAll } from '@/api/category/Category_GetAll'
import { Product_GetByName } from '@/api/product/Product_GetByName'
import { Product_GetOne, queryProduct_GetOne } from '@/api/product/Product_GetOne'
import LoadingComponent from '@/common/components/LoadingComponent'
import ModalWrapper from '@/common/components/modal/ModalWrapper'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { urlToFile } from '@/lib/util/urlToFile'
import { queryClient } from '@/main'
import { GetImages } from '@/routes/Products/common/util/GetImages'
import { UpdateProduct } from '@/routes/Products/common/util/UpdateProduct'
import { ExpandAltOutlined } from '@ant-design/icons'
import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import { Button, Divider, Flex, Form, Input, Select, Upload, UploadFile, message } from 'antd'

const { Item: FormItem } = Form

type UpdateProductFormProps = {
    productId: string
}

type FieldType = {
    name: string
    description: string
    categoryId: string
    images: UploadFile<any>[]
}

export default function UpdateProductForm({ productId }: UpdateProductFormProps) {
    const { messageApi } = useMessage()
    const {
        product: { data: dataProduct, isError, isLoading, isSuccess, error },
        categories: { data: dataCategories, isError: isError_Categories, isLoading: isLoading_Categories, isSuccess: isSuccess_Categories },
    } = useQueries({
        queries: [
            {
                queryKey: ['product', productId],
                queryFn: () => Product_GetOne({ id: productId }),
                staleTime: Infinity,
                gcTime: 0,
                retry: 0,
            },
            queryCategory_GetAll(),
        ],
        combine: data => {
            return {
                product: data[0],
                categories: data[1],
            }
        },
    })

    const product = dataProduct?.data
    const categories = dataCategories

    const {
        data: images,
        isLoading: isLoading_Images,
        isError: isError_Images,
        isSuccess: isSuccess_Images,
        error: error_Images,
    } = useQuery({
        queryKey: ['file', productId, product?.images],
        queryFn: () => GetImages(product?.images ?? []),
        enabled: !!product,
        select: data =>
            data.map(
                (img: string, index) =>
                    ({
                        uid: img,
                        name: `image-${index + 1}`,
                        status: 'done',
                        url: img,
                        key: img,
                        type: 'image/jpeg',
                    }) as unknown as UploadFile<any>,
            ),
    })

    const updateProductMutation = useMutation({
        mutationFn: UpdateProduct,
        onSuccess: () => {
            setTimeout(() => messageApi.success('Product updated successfully'), 250)
            queryClient.invalidateQueries({
                queryKey: queryProduct_GetOne({ id: productId }).queryKey,
            })
        },
        onError: error => {
            setTimeout(() => messageApi.error('Error while updating product'), 250)
            devLog(error)
        },
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Updating Product',
                key: 'updating-product',
            })
        },
        onSettled: () => {
            messageApi.destroy('updating-product')
        },
    })

    const [form] = Form.useForm<FieldType>()
    async function handleFinish() {
        await updateProductMutation.mutateAsync({
            product: {
                id: productId,
                payload: {
                    name: form.getFieldValue('name'),
                    description: form.getFieldValue('description'),
                    category_id: form.getFieldsValue().categoryId,
                    images: [],
                },
            },
            images: await Promise.all(
                form.getFieldsValue().images.map(async img => {
                    if (typeof img.url === 'string') {
                        return await urlToFile(img.url, img.name, 'image/jpeg')
                    } else {
                        return img.originFileObj as File
                    }
                }),
            ),
        })
    }

    if (isLoading || isLoading_Images) {
        return <LoadingComponent />
    }

    if (isError || isError_Images) {
        return <div>{error?.message || error_Images?.message}</div>
    }

    if (!isSuccess) return // product WILL exist after this line

    return (
        <Form<FieldType>
            form={form}
            name='create-product-form'
            initialValues={{
                name: product!.name,
                description: product!.description,
                images: images,
                optional: [],
            }}
            onFinish={handleFinish}
            size='large'
            layout='vertical'
            requiredMark={false}
            colon={false}
            disabled={updateProductMutation.isPending}
        >
            <Flex gap={20}>
                {/* NAME INPUT */}
                <FormItem<FieldType>
                    label='Name'
                    name='name'
                    hasFeedback
                    rules={[
                        { required: true },
                        { min: 2 },
                        { max: 200 },
                        {
                            async validator(_, value) {
                                if (value === product!.name) return Promise.resolve()
                                const alreadyExists = await Product_GetByName({ name: value })
                                if (alreadyExists.data !== null) {
                                    return Promise.reject('Product with this name already exists.')
                                } else {
                                    return Promise.resolve()
                                }
                            },
                        },
                    ]}
                    style={{
                        width: '50%',
                    }}
                    validateDebounce={2000}
                >
                    <Input placeholder='Mobile Phone' />
                </FormItem>

                {/* CATEGORY INPUT */}
                {isLoading_Categories && <Input disabled />}
                {isError_Categories && <Input disabled />}
                {isSuccess_Categories && (
                    <FormItem<FieldType>
                        label='Category'
                        name='categoryId'
                        style={{
                            width: '50%',
                        }}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        initialValue={product?.category_id.id}
                    >
                        <Select
                            showSearch
                            placeholder='Select a Category'
                            options={categories?.data.map(cat => ({
                                value: cat.id ?? '',
                                label: cat.name ?? '',
                            }))}
                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            onChange={value => {
                                form.setFieldValue('categoryId', value)
                            }}
                        />
                    </FormItem>
                )}
            </Flex>

            {/* IMAGES INPUT */}
            <FormItem<FieldType>
                name='images'
                label='Images'
                valuePropName='fileList'
                rules={[{ required: true }]}
                getValueFromEvent={e => {
                    if (Array.isArray(e)) {
                        return e
                    }
                    return e && e.fileList
                }}
            >
                {isSuccess_Images && (
                    <Upload.Dragger
                        name='files'
                        multiple
                        listType='picture'
                        accept='image/*'
                        showUploadList
                        beforeUpload={() => false}
                        onChange={info => {
                            const isImage = info.file.type?.startsWith('image/') || info.file.type?.startsWith('blob')
                            if (!isImage) {
                                message.error('You can only upload image files!')
                                info.fileList = info.fileList.filter(file => file.type?.startsWith('image/'))
                            }

                            if (info.file.size && info.file.size > 5 * 1024 * 1024) {
                                message.error('You can only upload images smaller than 5MB!')
                                info.fileList = info.fileList.filter(file => file.size && file.size <= 5 * 1024 * 1024)
                            }

                            if (form.getFieldsValue().images.length > 3) {
                                message.error('You can only upload 3 images!')
                                info.fileList = info.fileList.filter((_, index) => index < 3)
                            }

                            if (info.fileList.length > 3) {
                                info.fileList = info.fileList.filter((_, index) => index < 3)
                            }

                            form.setFieldsValue({ images: info.fileList })
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                rowGap: 8,
                            }}
                        >
                            <p
                                style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 500,
                                }}
                            >
                                Drag & drop product image here
                            </p>
                            <Divider>OR</Divider>
                            <Button>Select Files</Button>
                        </div>
                    </Upload.Dragger>
                )}
            </FormItem>

            {/* DESCRIPTION INPUT */}
            <ModalWrapper
                modalProps={{
                    title: 'Description',
                    width: '50%',
                }}
                modalComponent={() => (
                    <FormItem<FieldType> name='description' rules={[{ required: true }]}>
                        <Input.TextArea rows={20} />
                    </FormItem>
                )}
            >
                {({ handleOpen }) => (
                    <FormItem<FieldType>
                        label={
                            <>
                                <div>Description</div>
                                <Button
                                    onClick={handleOpen}
                                    size='small'
                                    style={{
                                        marginLeft: '10px',
                                    }}
                                    icon={<ExpandAltOutlined />}
                                />
                            </>
                        }
                        name='description'
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea rows={5} />
                    </FormItem>
                )}
            </ModalWrapper>

            <Flex justify='end'>
                <Button
                    htmlType='submit'
                    type='primary'
                    style={{
                        marginTop: 20,
                    }}
                >
                    Update
                </Button>
            </Flex>
        </Form>
    )
}
