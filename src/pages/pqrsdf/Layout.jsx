import { stringToObject } from '@/libV4'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

const Layout = () => {
  const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'VITE_THEME_APPLICATION')
  const navigate = useNavigate()
  const HorizontalLogo = themeApp.horizontalImg
  const path = window.location.pathname
  const { id } = useParams()
  const [titlePage, setTitlePage] = useState()
  useEffect(() => {
    if (path.includes('registry')) {
      setTitlePage('Radique su PQRSDF')
    }
  }, [path])

  return (
    <div>
      <header>
        <nav className='py-5 px-10 flex flex-row items-center justify-between'>
          <img
            src={HorizontalLogo}
            onClick={() => navigate(`/pqrsdf/${id}`)}
            style={{
              width: '100%',
              minWidth: '180px',
              maxWidth: '50px',
              height: 'auto',
            }}
            alt='Imagen compnania'
          />
          <Typography variant='customTitle'>{titlePage}</Typography>
        </nav>
      </header>

      <Box
        className='flex justify-center min-h-[calc(100vh-100px)]'
        bgcolor={'primary.main'}
      >
        <div className='my-1 w-full bg-white rounded-lg shadow-md p-5 flex justify-center'>
          <div className='max-w-5xl w-full'>
            <Outlet />
          </div>
        </div>
      </Box>
      <footer className='flex flex-col items-center py-4'>
        <img
          src='/assets/svg/logoSiifWebWithText.svg'
          alt='Logo SiifWeb'
          width={163}
          height={42}
        />
        <Typography variant='customSubtitle'>
          Soluciones de información ® {new Date().getFullYear()}
        </Typography>
      </footer>
    </div>
  )
}

export default Layout
