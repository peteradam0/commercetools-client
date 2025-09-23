import { THeroImage } from '../../../../public/home/heroImages'
import { HeroGallery } from './HeroGallery/HeroGallery'

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
