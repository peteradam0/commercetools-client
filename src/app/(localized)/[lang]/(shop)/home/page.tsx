import { heroImages } from '../../../../../../public/home/heroImages'

import { HeroGallery } from '@/app/shared/ui/HeroGallery/HeroGallery'

export default function HomePageRoute() {
  return (
    <div>
      <HeroGallery heroImages={heroImages} />
    </div>
  )
}
