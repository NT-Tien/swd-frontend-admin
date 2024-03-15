import ModalWrapper from '@/common/components/modal/ModalWrapper'
import { Product } from '@/lib/types/Product'
import { CategoryViewRoute } from '@/routes/Categories/CategoryView'
import OptionalProductsCard from '@/routes/Products/ProductView/components/OptionalProductsCard'
import ProductImagesView from '@/routes/Products/ProductView/components/ProductImagesView'
import { SelectOutlined } from '@ant-design/icons'
import { Info } from '@phosphor-icons/react'
import { useNavigate } from '@tanstack/react-router'
import { Button, Card, Col, Flex, Row, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'

const DEFAULT_GUTTER_SIZE = 10

type AboutProductProps = {
    product: Product
}

export default function AboutProduct({ product }: AboutProductProps) {
    const navigate = useNavigate()

    return (
        <Flex gap={DEFAULT_GUTTER_SIZE} vertical>
            <Row gutter={[DEFAULT_GUTTER_SIZE, DEFAULT_GUTTER_SIZE]}>
                <Col
                    span={16}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: DEFAULT_GUTTER_SIZE,
                    }}
                >
                    <Flex gap={DEFAULT_GUTTER_SIZE}>
                        <Card
                            title={
                                <Flex justify='space-between' align='center'>
                                    Name
                                    <Tooltip title='Info'>
                                        <Info />
                                    </Tooltip>
                                </Flex>
                            }
                            style={{
                                width: '100%',
                            }}
                        >
                            <Typography.Paragraph ellipsis>{product.name}</Typography.Paragraph>
                        </Card>
                        <Card
                            title={
                                <Flex justify='space-between' align='center'>
                                    Created
                                    <Tooltip title='Info'>
                                        <Info />
                                    </Tooltip>
                                </Flex>
                            }
                            style={{
                                width: '100%',
                            }}
                        >
                            <Typography.Paragraph ellipsis>{dayjs(product.createdAt).format('DD-MM-YYYY')}</Typography.Paragraph>
                        </Card>
                        <Card
                            title={
                                <Flex justify='space-between' align='center'>
                                    Updated
                                    <Tooltip title='Info'>
                                        <Info />
                                    </Tooltip>
                                </Flex>
                            }
                            style={{
                                width: '100%',
                            }}
                        >
                            <Typography.Paragraph ellipsis>{dayjs(product.updatedAt).format('DD-MM-YYYY')}</Typography.Paragraph>
                        </Card>
                        <Card
                            title={
                                <Flex justify='space-between' align='center'>
                                    Category
                                    <Tooltip title='Info'>
                                        <Info />
                                    </Tooltip>
                                </Flex>
                            }
                            style={{
                                width: '100%',
                            }}
                        >
                            <Typography.Paragraph ellipsis>
                                {product.category_id.name}
                                <Button
                                    size='small'
                                    icon={<SelectOutlined />}
                                    style={{
                                        marginLeft: '10px',
                                    }}
                                    onClick={() =>
                                        navigate({
                                            to: CategoryViewRoute.to,
                                            params: {
                                                id: product.category_id.id,
                                            },
                                        })
                                    }
                                />
                            </Typography.Paragraph>
                        </Card>
                    </Flex>
                    <ModalWrapper
                        modalProps={{
                            footer: null,
                        }}
                        modalComponent={() => <Typography.Paragraph>{product.description}</Typography.Paragraph>}
                    >
                        {({ handleOpen }) => (
                            <Card
                                title={
                                    <Flex justify='space-between' align='center'>
                                        Description
                                        <Tooltip title='Info'>
                                            <Info />
                                        </Tooltip>
                                    </Flex>
                                }
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    flexGrow: 1,
                                    cursor: 'pointer',
                                }}
                                onClick={handleOpen}
                            >
                                <Typography.Paragraph ellipsis={{ rows: 5, expandable: false }}>{product.description}</Typography.Paragraph>
                            </Card>
                        )}
                    </ModalWrapper>
                </Col>
                <Col span={8}>
                    <ProductImagesView imageLinks={product.images} productId={product.id} />
                </Col>
            </Row>
            <Row gutter={[DEFAULT_GUTTER_SIZE, DEFAULT_GUTTER_SIZE]}>
                <OptionalProductsCard optionalProducts={product.optionProducts} />
            </Row>
        </Flex>
    )
}
