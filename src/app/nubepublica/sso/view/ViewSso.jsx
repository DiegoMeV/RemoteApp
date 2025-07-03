import { Loading } from '@/lib'
import { Box, Typography } from '@mui/material'
import { InfoOutlined } from '@mui/icons-material'
const ViewSso = ({ isFetchingToken, isError }) => {
  return (
    <>
      {isFetchingToken && <Loading />}
      {isError && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh',
          }}
        >
          <InfoOutlined
            color='warning'
            sx={{ fontSize: '110px' }}
          />
          <Typography
            color='#828282'
            variant='h4'
          >
            Token no enviado
          </Typography>
        </Box>
      )}
    </>
  )
}

export default ViewSso
