import { svgs } from '@/libV4'
import '../styles/styles.css'

const Logo = () => {
  const basePath = window.location.origin

  const companyImg =
    basePath.includes('servicio-oci') || !import.meta.env.VITE_COMPANY_IMAGE
      ? svgs.LogoSolucionesInformacion
      : import.meta.env.VITE_COMPANY_IMAGE

  return (
    <div className='login_image'>
      <img
        src={companyImg}
        alt='Imagen de la compañía'
        className='lg:w-max-[300px] xs:w-max-[250px] h-auto'
      />
    </div>
  )
}

export default Logo
