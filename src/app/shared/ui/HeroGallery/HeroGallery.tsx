'use client'

import FlatButton from '@commercetools-uikit/flat-button'
import PrimaryButton from '@commercetools-uikit/primary-button'
import Spacings from '@commercetools-uikit/spacings'
import Text from '@commercetools-uikit/text'
import React from 'react'
import styled from 'styled-components'

import { THeroImage } from '../../../../../public/home/heroImages'

import { HeroSubtitle, HeroTitle } from '@/app/shared/ui/HeroGallery/HeroTtile'
import ImageCard from '@/app/shared/ui/ImageCard'

const HeroContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  margin-bottom: 5rem;
`

const HeroSection = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeroContent = styled.div`
  text-align: center;
  padding: 0 1rem;
`

const GridContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
`

const MobileGrid = styled.div`
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`

const DesktopGrid = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
    grid-auto-rows: 200px;

    @media (min-width: 1024px) {
      gap: 1.5rem;
    }
  }
`

const MobileCard = styled(ImageCard)`
  aspect-ratio: 4/3;
  margin-bottom: 1rem;
`

const LargeCard = styled(ImageCard)`
  grid-column: span 8;
  grid-row: span 3;
`

const MediumCard = styled(ImageCard)`
  grid-column: span 4;
  grid-row: span 2;
`

const MediumWideCard = styled(ImageCard)`
  grid-column: span 6;
  grid-row: span 2;
`

const SmallCard = styled(ImageCard)`
  grid-column: span 2;
  grid-row: span 1;
`

export type HeroGalleryProps = {
  heroImages: THeroImage[]
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({ heroImages }) => {
  const renderImageCard = (image, CardComponent) => (
    <CardComponent key={image.id}>
      <img src={image.src} alt={image.alt} />
      <div className='overlay'>
        <div className='content'>
          <Spacings.Stack scale='xs'>
            <Text.Headline as='h3' tone='primary'>
              {image.title}
            </Text.Headline>
            <Text.Body tone='primary'>{image.subtitle}</Text.Body>
            <FlatButton
              as='a'
              href={image.link}
              label='Shop Now'
              tone='primary'
              size='small'
            />
          </Spacings.Stack>
        </div>
      </div>
    </CardComponent>
  )

  return (
    <HeroContainer>
      <HeroSection>
        <HeroImage
          src='https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=1080&fit=crop'
          alt='Fashion Hero'
        />
        <HeroOverlay>
          <HeroContent>
            <Spacings.Stack scale='l'>
              <HeroTitle>
                <Text.Headline as='h1' tone='primary'>
                  FASHION FORWARD
                </Text.Headline>
              </HeroTitle>
              <HeroSubtitle>
                <Text.Subheadline as='h4' tone='primary'>
                  Discover the latest trends and timeless classics
                </Text.Subheadline>
              </HeroSubtitle>
              <div>
                <PrimaryButton label='SHOP NOW' size='big' tone='primary' />
              </div>
            </Spacings.Stack>
          </HeroContent>
        </HeroOverlay>
      </HeroSection>

      <GridContainer>
        <Spacings.Stack scale='xl'>
          <MobileGrid>
            <Spacings.Stack scale='m'>
              {heroImages.map(image => renderImageCard(image, MobileCard))}
            </Spacings.Stack>
          </MobileGrid>

          <DesktopGrid>
            {renderImageCard(heroImages[0], LargeCard)}
            {renderImageCard(heroImages[1], MediumCard)}
            {renderImageCard(heroImages[3], SmallCard)}
            {renderImageCard(heroImages[4], SmallCard)}
            {renderImageCard(heroImages[2], MediumWideCard)}
            {renderImageCard(heroImages[5], MediumWideCard)}
          </DesktopGrid>
        </Spacings.Stack>
      </GridContainer>
    </HeroContainer>
  )
}
