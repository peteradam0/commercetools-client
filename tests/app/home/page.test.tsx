import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HomePageRoute from '../../../src/app/(localized)/[lang]/(shop)/home/page'

// Mock the HeroGallery component
vi.mock('@/app/shared/ui/HeroGallery/HeroGallery', () => ({
  HeroGallery: ({ heroImages }: { heroImages: any[] }) => (
    <div data-testid='hero-gallery'>
      {heroImages.map(image => (
        <div key={image.id} data-testid={`hero-image-${image.id}`}>
          {image.title}
        </div>
      ))}
    </div>
  ),
}))

// Mock the heroImages data
vi.mock('../../../public/home/heroImages', () => ({
  heroImages: [
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
  ],
}))

describe('HomePageRoute', () => {
  it('should render the home page component', () => {
    render(<HomePageRoute />)

    const heroGallery = screen.getByTestId('hero-gallery')
    expect(heroGallery).toBeInTheDocument()
  })

  it('should render the HeroGallery with hero images', () => {
    render(<HomePageRoute />)

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
    render(<HomePageRoute />)

    const container = document.querySelector('div')
    expect(container).toBeInTheDocument()
  })

  it('should pass hero images data to HeroGallery component', () => {
    render(<HomePageRoute />)

    // Verify that both mock images are rendered
    expect(screen.getByTestId('hero-image-1')).toBeInTheDocument()
    expect(screen.getByTestId('hero-image-2')).toBeInTheDocument()
  })
})
