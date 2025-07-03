import { Backdrop, CircularProgress } from '@mui/material'

const BackdropLoading = ({ loading = false, sizeLoading, sx }) => {
  return loading ? (
    <Backdrop
      open={loading}
      sx={{ color: '#fff', zIndex: '2000', ...sx }}
    >
      <CircularProgress
        color='primary'
        size={sizeLoading ?? 120}
      />
    </Backdrop>
  ) : (
    <></>
  )
}

export default BackdropLoading
