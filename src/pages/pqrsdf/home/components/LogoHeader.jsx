import { stringToObject } from '@/libV4'

const LogoHeader = () => {
  const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'VITE_THEME_APPLICATION')
  const VerticalLogo = themeApp.verticalImg
  return (
    <img
      src={VerticalLogo}
      alt='Lotería del Risaralda'
      className='h-60 mb-6 w-60'
    />
  )
}

export default LogoHeader
