import { HeroGallery } from '@/app/shared/ui/HeroGallery/HeroGallery'

import { heroImages } from '../../../../../../public/home/heroImages'

export default function HomePageRoute() {
  return (
    <div>
      <HeroGallery heroImages={heroImages} />
    </div>
  )
}
