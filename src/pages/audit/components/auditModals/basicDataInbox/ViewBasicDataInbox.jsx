import { Loading } from '@/lib'
import { Box } from '@mui/material'
import { CardsInfoData } from './components'

const ViewBasicDataInbox = ({ info, isLoading, idProcess }) => {
  return (
    <Box
      sx={{
        bgcolor: 'backgroundGrey1',
        borderRadius: 4,
        height: '100%',
        width: '100%',
        overflow: 'auto',
        p: 2,
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <CardsInfoData
          title={'Datos del proceso'}
          info={info}
          idProcess={idProcess}
        />
      )}
    </Box>
  )
}

export default ViewBasicDataInbox
