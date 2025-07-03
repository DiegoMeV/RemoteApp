import { CircularProgress, Typography } from '@mui/material'
import loadingImage from '../../assets/svg/logoloading.svg'
import './styles/styles.css'
import { stringToObject } from '../../funcs/dataModifications'
import { THEME_APPLICATION } from '../../constants'

const Loading = ({ className = '' } = {}) => {
  const themeApp = stringToObject(THEME_APPLICATION, 'THEME_APPLICATION')

  return (
    <div className={`flex items-center justify-center min-h-screen ${className}`}>
      <div className='flex flex-col items-center'>
        <Typography
          className='text-center mb-6'
          variant='h5'
        >
          Cargando...
        </Typography>
        {themeApp?.icon ? (
          <CircularProgress
            color='primary'
            size={100}
          />
        ) : (
          <img
            src={loadingImage}
            className='animation_loading animate-spin'
            alt='Synchrox loading'
          />
        )}
      </div>
    </div>
  )
}

export default Loading
