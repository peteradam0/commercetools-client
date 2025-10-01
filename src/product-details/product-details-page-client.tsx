'use client'

import {
  PrimaryButton,
  SecondaryButton,
  Spacings,
} from '@commercetools-frontend/ui-kit'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { useCart } from '@/cart/domain/useCart'
import { ColorOption, ColorSelector } from '@/product-details/ColorSelector'
import { ProductImageGallery } from '@/product-details/ProductImageGallery'
import { ProductInfo } from '@/product-details/ProductInfo'
import { SizeSelector } from '@/product-details/SizeSelector'
import { Product } from '@/product-listing/domain/Product.types'
import {
  getColorImages,
  getProductVariations,
} from '@/product-listing/domain/mockData'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`

const AddToCartButton = styled(PrimaryButton)`
  flex: 1;
  min-width: 200px;
`

const WishlistButton = styled(SecondaryButton)`
  min-width: 150px;
`

export type ProductDetailsPageClientProps = {
  productData: Product
}

export const ProductDetailsPageClient: React.FC<
  ProductDetailsPageClientProps
> = ({ productData }) => {
  const variations = getProductVariations()

  const [selectedColor, setSelectedColor] = useState(variations.colors[0])
  const [selectedSize, setSelectedSize] = useState<string>('')

  const currentImages = useMemo(() => {
    const colorImages = getColorImages(selectedColor.id, productData.name)
    return colorImages.length > 0 ? colorImages : productData.images
  }, [selectedColor.id, productData.name, productData.images])

  const handleColorChange = (color: ColorOption) => {
    setSelectedColor(color)
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
  }

  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    await addToCart({ productId: productData.id })
  }

  return (
    <Container>
      <ProductLayout>
        <ProductImageGallery
          images={currentImages}
          productName={productData.name}
        />

        <Spacings.Stack scale='l'>
          <ProductInfo product={productData} />

          <ActionsContainer>
            <ColorSelector
              colors={variations.colors}
              selectedColorId={selectedColor.id}
              onColorChange={handleColorChange}
            />

            <SizeSelector
              sizes={variations.sizes}
              selectedSize={selectedSize}
              onSizeChange={handleSizeChange}
              required
              error={!selectedSize}
            />

            <ActionButtons>
              <AddToCartButton
                onClick={handleAddToCart}
                isDisabled={!productData.inStock || !selectedSize}
                label={!selectedSize ? 'Select Size' : 'Add to Cart'}
              />
              <WishlistButton onClick={() => {}} label='Add to Wishlist' />
            </ActionButtons>
          </ActionsContainer>
        </Spacings.Stack>
      </ProductLayout>
    </Container>
  )
}
