import ViewMoreImagesModal from '@/routes/Products/ProductView/components/modal/ViewMoreImagesModal'
import { GetImages } from '@/routes/Products/common/util/GetImages'
import { Info, Plus } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, CardProps, Flex, Image, Skeleton, Tooltip } from 'antd'

type ProductImagesViewProps = {
    imageLinks: string[]
    productId: string
} & CardProps

export default function ProductImagesView({ imageLinks, productId, ...otherProps }: ProductImagesViewProps) {
    const {
        data: images,
        isLoading,
        isError,
        isSuccess,
    } = useQuery({
        queryKey: ['file', productId, imageLinks],
        queryFn: () => GetImages(imageLinks),
        select: data => data,
        refetchOnWindowFocus: false,
    })

    if (isError) {
        return <div>Error fetching images</div>
    }

    return (
        <ViewMoreImagesModal>
            {({ handleOpen: handleOpenViewMoreImages }) => (
                <Card
                    title={
                        <Flex justify='space-between' align='center'>
                            Product Images
                            <Tooltip title='Info'>
                                <Info />
                            </Tooltip>
                        </Flex>
                    }
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    {...otherProps}
                >
                    {isLoading ? (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 2fr)',
                                gap: '10px',
                                width: '100%',
                            }}
                        >
                            {new Array(6).fill(null).map((_, index) => (
                                <Skeleton.Image
                                    key={`skeleton-${index}`}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        aspectRatio: '1/1',
                                        borderRadius: '5px',
                                    }}
                                ></Skeleton.Image>
                            ))}
                        </div>
                    ) : (
                        isSuccess && (
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 2fr)',
                                    gap: '10px',
                                    width: '100%',
                                }}
                            >
                                {images.slice(0, 5).map((img, index) => (
                                    <Image
                                        src={img}
                                        key={`image-view-${index}`}
                                        preview
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            aspectRatio: '1/1',
                                            borderRadius: '5px',
                                        }}
                                    />
                                ))}
                                {images.length < 5 &&
                                    new Array(5 - images.length).fill(null).map((_, index) => (
                                        <Button
                                            key={`button-${index}`}
                                            type='dashed'
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                                aspectRatio: '1/1',
                                                display: 'grid',
                                                placeItems: 'center',
                                            }}
                                        >
                                            <Plus weight='bold' size='14' />
                                        </Button>
                                    ))}
                                <Button
                                    type='dashed'
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        aspectRatio: '1/1',
                                    }}
                                    onClick={() => handleOpenViewMoreImages(images)}
                                >
                                    View
                                </Button>
                            </div>
                        )
                    )}
                </Card>
            )}
        </ViewMoreImagesModal>
    )
}
