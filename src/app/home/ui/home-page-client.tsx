import { HeroGallery } from '@/app/home/ui/HeroGallery/HeroGallery'

import { THeroImage } from '../../../../public/home/heroImages'

export type HomePageClientProps = {
  heroImages: THeroImage[]
}

export const HomePageClient: React.FC<HomePageClientProps> = ({
  heroImages,
}) => {
  return (
    <>
      <HeroGallery heroImages={heroImages} />
    </>
  )
}
