export type THeroImage = {
  id: number
  src: string
  alt: string
  title: string
  subtitle: string
  link: string
  size: string
}

export const heroImages: THeroImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
    alt: 'Winter Collection 2025',
    title: 'Winter Collection 2025',
    subtitle: 'Embrace the season with style',
    link: '/collections/winter',
    size: 'large',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
    alt: 'Essential Basics',
    title: 'Essential Basics',
    subtitle: 'Timeless pieces for every wardrobe',
    link: '/collections/basics',
    size: 'medium',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop',
    alt: 'New Arrivals',
    title: 'New Arrivals',
    subtitle: 'Fresh styles just in',
    link: '/collections/new',
    size: 'medium',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=500&fit=crop',
    alt: 'Sale Items',
    title: 'Sale Items',
    subtitle: 'Up to 50% off selected items',
    link: '/sale',
    size: 'small',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop',
    alt: 'Accessories',
    title: 'Accessories',
    subtitle: 'Complete your look',
    link: '/collections/accessories',
    size: 'small',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1000&h=600&fit=crop',
    alt: 'Premium Collection',
    title: 'Premium Collection',
    subtitle: 'Luxury meets comfort',
    link: '/collections/premium',
    size: 'medium',
  },
]
