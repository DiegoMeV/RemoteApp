import { useQueryDynamicApi } from '@/libV4/api'
import { stringToObject } from '@/libV4/funcs'
import { useLogout } from '@/libV4/hooks'
import { useStoreState } from 'easy-peasy'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { OptionsNavbar, OptionsNavbarMenu } from '.'
import { ButtonUser } from './components'
import { svgs } from '@/libV4/assets'
import { useValidateDirtyForm } from '@/lib/hooks'
import { excludeNavbarPaths } from './constants'

const Navbar = () => {
  const location = useLocation()
  const tokenData = useStoreState((state) => state.token.tokenData)
  const userData = useStoreState((state) => state.user.userData)
  const validateDirtyForm = useValidateDirtyForm()

  const { data: dataImage, isLoading: isLoadingImg } = useQueryDynamicApi({
    baseKey: 'urlDocuments',
    enabled: !!userData?.preferences?.avatar,
    url: `/archivos/${userData?.preferences?.avatar}`,
  })

  const logout = useLogout()

  const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'THEME_APPLICATION')

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {!excludeNavbarPaths.includes(location.pathname) && tokenData?.token && (
        <>
          <nav className='navbar-container backgroundwhite1'>
            <div className='options-var'>
              {isSmallScreen && <OptionsNavbarMenu validateDirtyForm={validateDirtyForm} />}
              <div className='flex flex-shrink-0 items-center'>
                <img
                  className='h-12 w-auto'
                  src={themeApp?.icon || svgs.dashboardLogo}
                  alt='Logo navbar'
                />
              </div>
              {!isSmallScreen && <OptionsNavbar validateDirtyForm={validateDirtyForm} />}
            </div>
            <ButtonUser
              userData={userData}
              dataImage={dataImage}
              isLoadingImg={isLoadingImg}
              logout={logout}
              isSmallScreen={isSmallScreen}
              validateDirtyForm={validateDirtyForm}
            />
          </nav>
        </>
      )}
    </>
  )
}

export default Navbar
