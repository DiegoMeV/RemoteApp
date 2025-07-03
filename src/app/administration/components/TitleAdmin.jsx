import { ClassicIconButton } from '@/lib'
import { ArrowBack } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const TitleAdmin = ({ title, back, backpath, children, className }) => {
  const navigate = useNavigate()

  return (
    <Grid
      className={className ?? ''}
      container
      justifyContent={
        children ? { xs: 'center', md: 'space-between', xl: 'flex-start' } : 'flex-start'
      }
      rowGap={2}
      alignItems='center'
      borderRadius='10px 10px 0 0'
      backgroundColor='backgroundGrey2'
      height='100%'
      padding={2}
      maxHeight={70}
    >
      <Grid
        item
        container
        alignItems='center'
        xs={12}
        md={children ? 6 : 12}
        lg={children ? 5 : 12}
        xl={children ? 4 : 12}
      >
        {back && (
          <ClassicIconButton
            onClick={() => navigate(backpath)}
            title='Regresar'
          >
            <ArrowBack />
          </ClassicIconButton>
        )}
        <Typography
          variant='h5'
          textAlign='start'
          color='primary'
        >
          {title}
        </Typography>
      </Grid>

      {children}
    </Grid>
  )
}

export default TitleAdmin
