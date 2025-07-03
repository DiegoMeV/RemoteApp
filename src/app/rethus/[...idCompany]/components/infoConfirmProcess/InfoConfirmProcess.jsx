import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { IdToModal } from './components'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const InfoConfirmProcess = ({ infoProcessSelected, idCompany = '' }) => {
  const { token } = useStoreState((state) => state.token.tokenData || {})

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const handleBackInbox = () => {
    if (!token && idCompany) {
      navigate(`/rethus/${idCompany}`)
      return
    }

    queryClient.invalidateQueries([`/inbox`])
    navigate('/inbox')
  }

  return (
    <>
      <Box
        bgcolor='backgroundWhite1'
        p={2}
        borderRadius={2}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Typography
          variant='h5'
          color='primary'
          mb='30px'
        >
          Radicación completada
        </Typography>
        <IdToModal summaryInfo={infoProcessSelected} />

        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 2, width: 'fit-content' }}
          onClick={handleBackInbox}
        >
          {!token ? 'Nuevo registro' : 'Volver a bandeja'}
        </Button>
      </Box>
    </>
  )
}
export default InfoConfirmProcess
