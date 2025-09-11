import { Card } from '@commercetools-frontend/ui-kit'
import React, { useState } from 'react'
import styled from 'styled-components'

import { ProductImage } from '@/domains/products/domain/Product.types'

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const MainImageCard = styled(Card)`
  padding: 0;
  overflow: hidden;
  border-radius: 8px;
`

const MainImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  background-color: #f5f5f5;
  cursor: pointer;
`

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 12px;
  max-width: 400px;
`

const ThumbnailCard = styled(Card)<{ $active: boolean }>`
  padding: 0;
  overflow: hidden;
  border-radius: 4px;
  border: 2px solid ${props => (props.$active ? '#007bff' : 'transparent')};
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #007bff;
  }
`

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  display: block;
`

const fallbackImage =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='

const thumbnailFallbackImage =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='

export interface ProductImageGalleryProps {
  images: ProductImage[]
  productName: string
  onImageClick?: (imageIndex: number) => void
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  onImageClick,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.src = fallbackImage
  }

  const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.src = thumbnailFallbackImage
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index)
    onImageClick?.(index)
  }

  const handleMainImageClick = () => {
    onImageClick?.(selectedImageIndex)
  }

  if (!images.length) {
    return (
      <GalleryContainer>
        <MainImageCard>
          <MainImage
            src={fallbackImage}
            alt={productName}
            onClick={handleMainImageClick}
          />
        </MainImageCard>
      </GalleryContainer>
    )
  }

  const currentImage = images[selectedImageIndex] || images[0]

  return (
    <GalleryContainer>
      <MainImageCard>
        <MainImage
          src={currentImage.url}
          alt={currentImage.alt || productName}
          onError={handleImageError}
          onClick={handleMainImageClick}
        />
      </MainImageCard>

      {images.length > 1 && (
        <ThumbnailGrid>
          {images.map((image, index) => (
            <ThumbnailCard
              key={index}
              $active={selectedImageIndex === index}
              onClick={() => handleThumbnailClick(index)}
            >
              <Thumbnail
                src={image.url}
                alt={image.alt || `${productName} ${index + 1}`}
                onError={handleThumbnailError}
              />
            </ThumbnailCard>
          ))}
        </ThumbnailGrid>
      )}
    </GalleryContainer>
  )
}
