import { CustomCarrousel } from '@/libV4'
import bannerHome from '../../../../../public/assets/webp/banners/bannerHome.webp'
import bannerHome2 from '../../../../../public/assets/webp/banners/bannerHome2.webp'
import bannerHome3 from '../../../../../public/assets/webp/banners/bannerHome3.webp'
import bannerHome4 from '../../../../../public/assets/webp/banners/bannerHome4.webp'

export const cards = [
  {
    image: bannerHome,
    imageMovil: bannerHome,
  },
  {
    image: bannerHome2,
    imageMovil: bannerHome2,
  },
  {
    image: bannerHome3,
    imageMovil: bannerHome3,
  },
  {
    image: bannerHome4,
    imageMovil: bannerHome4,
  },
]

const CarouselSection = () => {
  return (
    <section>
      <CustomCarrousel cards={cards} />
    </section>
  )
}

export default CarouselSection
