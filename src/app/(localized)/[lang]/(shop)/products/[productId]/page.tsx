'use client'

import {
  PrimaryButton,
  SecondaryButton,
  Spacings,
} from '@commercetools-frontend/ui-kit'
import { notFound } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { ColorOption, ColorSelector } from '@/product-details/ColorSelector'
import { ProductImageGallery } from '@/product-details/ProductImageGallery'
import { ProductInfo } from '@/product-details/ProductInfo'
import { SizeSelector } from '@/product-details/SizeSelector'
import { mockProducts } from '@/product-listing/domain/mockData'

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

// Mock data for clothing variations
const getProductVariations = (): {
  colors: ColorOption[]
  sizes: string[]
} => {
  return {
    colors: [
      { id: 'black', name: 'Black', hex: '#000000' },
      { id: 'white', name: 'White', hex: '#ffffff' },
      { id: 'navy', name: 'Navy', hex: '#001f3f' },
      { id: 'gray', name: 'Gray', hex: '#808080' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  }
}

// Mock color-specific images
const getColorImages = (colorId: string, productName: string) => {
  const colorImageMap: Record<string, string[]> = {
    black: ['/clothing-black-1.jpg', '/clothing-black-2.jpg'],
    white: ['/clothing-white-1.jpg', '/clothing-white-2.jpg'],
    navy: ['/clothing-navy-1.jpg', '/clothing-navy-2.jpg'],
    gray: ['/clothing-gray-1.jpg', '/clothing-gray-2.jpg'],
  }

  const urls = colorImageMap[colorId] || []
  return urls.map((url, index) => ({
    url,
    alt: `${productName} ${colorId} ${index + 1}`,
  }))
}

interface ProductDetailsPageProps {
  params: Promise<{
    productId: string
    lang: string
  }>
}

export default function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { productId } = React.use(params)

  const product = useMemo(() => {
    return mockProducts.find(p => p.id === productId)
  }, [productId])

  if (!product) {
    notFound()
  }

  const variations = getProductVariations()

  const [selectedColor, setSelectedColor] = useState(variations.colors[0])
  const [selectedSize, setSelectedSize] = useState<string>('')

  const currentImages = useMemo(() => {
    const colorImages = getColorImages(selectedColor.id, product.name)
    return colorImages.length > 0 ? colorImages : product.images
  }, [selectedColor.id, product.name, product.images])

  const handleColorChange = (color: ColorOption) => {
    setSelectedColor(color)
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    console.log('Adding to cart:', {
      productId: product.id,
      color: selectedColor.name,
      size: selectedSize,
    })
    alert(
      `Added "${product.name}" (${selectedColor.name}, ${selectedSize}) to cart!`
    )
  }

  const handleAddToWishlist = () => {
    console.log('Adding to wishlist:', product.id)
    alert(`Added "${product.name}" to wishlist!`)
  }

  return (
    <Container>
      <ProductLayout>
        <ProductImageGallery
          images={currentImages}
          productName={product.name}
        />

        <Spacings.Stack scale='l'>
          <ProductInfo product={product} />

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
                isDisabled={!product.inStock || !selectedSize}
                label={!selectedSize ? 'Select Size' : 'Add to Cart'}
              />
              <WishlistButton
                onClick={handleAddToWishlist}
                label='Add to Wishlist'
              />
            </ActionButtons>
          </ActionsContainer>
        </Spacings.Stack>
      </ProductLayout>
    </Container>
  )
}
