import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { HomePageClient } from '@/app/home/ui/home-page-client'

// Mock the HeroGallery component
vi.mock('@/app/home/ui/HeroGallery/HeroGallery', () => ({
  HeroGallery: ({
    heroImages,
  }: {
    heroImages: { id: number; title: string }[]
  }) => (
    <div data-testid='hero-gallery'>
      {heroImages.map(image => (
        <div key={image.id} data-testid={`hero-image-${image.id}`}>
          {image.title}
        </div>
      ))}
    </div>
  ),
}))

// Mock hero images data
const mockHeroImages = [
  {
    id: 1,
    src: 'https://example.com/image1.jpg',
    alt: 'Test Image 1',
    title: 'Winter Collection 2025',
    subtitle: 'Embrace the season with style',
    link: '/collections/winter',
    size: 'large',
  },
  {
    id: 2,
    src: 'https://example.com/image2.jpg',
    alt: 'Test Image 2',
    title: 'Essential Basics',
    subtitle: 'Timeless pieces for every wardrobe',
    link: '/collections/basics',
    size: 'medium',
  },
]

describe('HomePageClient', () => {
  it('should render the home page component', () => {
    render(<HomePageClient heroImages={mockHeroImages} />)

    const heroGallery = screen.getByTestId('hero-gallery')
    expect(heroGallery).toBeInTheDocument()
  })

  it('should render the HeroGallery with hero images', () => {
    render(<HomePageClient heroImages={mockHeroImages} />)

    const heroGallery = screen.getByTestId('hero-gallery')
    expect(heroGallery).toBeInTheDocument()

    const firstImage = screen.getByTestId('hero-image-1')
    expect(firstImage).toBeInTheDocument()
    expect(firstImage).toHaveTextContent('Winter Collection 2025')

    const secondImage = screen.getByTestId('hero-image-2')
    expect(secondImage).toBeInTheDocument()
    expect(secondImage).toHaveTextContent('Essential Basics')
  })

  it('should have the correct structure', () => {
    render(<HomePageClient heroImages={mockHeroImages} />)

    const container = screen.getByTestId('hero-gallery')
    expect(container).toBeInTheDocument()
  })

  it('should pass hero images data to HeroGallery component', () => {
    render(<HomePageClient heroImages={mockHeroImages} />)

    // Verify that both mock images are rendered
    expect(screen.getByTestId('hero-image-1')).toBeInTheDocument()
    expect(screen.getByTestId('hero-image-2')).toBeInTheDocument()
  })
})
