import { HomePageClient } from '@/app/home/ui/home-page-client'

import { getHeroImages } from '../../../../../../public/home/heroImages'

export default async function HomePageRoute() {
  const images = getHeroImages()

  return <HomePageClient heroImages={images} />
}
