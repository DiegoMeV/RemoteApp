import { Stack } from '@mui/material'
import { AccessCardData, ImageAccessCard } from './components'
import './styles/styles.css'

const NoAccessCard = () => {
  return (
    <div className='container-access-page'>
      <div className='w-4/5 max-w-[750px] pt-12 mx-auto'>
        <Stack
          flexDirection={{ xs: 'column', md: 'row' }}
          className='access-card'
          sx={{
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0px 2px 28px -1px rgba(250,250,250,0.82)'
                : '0px 5px 21px -5px rgba(0,0,0,0.68)',
          }}
        >
          <AccessCardData />
          <ImageAccessCard />
        </Stack>
      </div>
    </div>
  )
}
export default NoAccessCard
