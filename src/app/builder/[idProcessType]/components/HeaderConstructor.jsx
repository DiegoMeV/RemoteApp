import { Box, Typography } from '@mui/material'

import { ArrowBack } from '@mui/icons-material'

import { useNavigate } from 'react-router-dom'
import { ClassicIconButton } from '@/lib'

import styles from '../styles/ContentConstructorStyles.module.css'

const HeaderConstructor = ({ infoTypeProcess }) => {
  const navigate = useNavigate()

  return (
    <Box
      component='div'
      className={styles.titleStyles}
    >
      <ClassicIconButton
        onClick={() => {
          navigate(-1)
        }}
        title='Volver'
        placement='bottom'
      >
        <ArrowBack />
      </ClassicIconButton>
      {infoTypeProcess?.data && (
        <Typography
          variant='h6'
          color='primary'
        >
          {infoTypeProcess?.data?.[0]?.Group?.name} - {infoTypeProcess?.data?.[0]?.name}
        </Typography>
      )}
    </Box>
  )
}

export default HeaderConstructor
