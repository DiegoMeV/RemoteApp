import { Box, Button, Typography } from '@mui/material'
import { ContainerForm, NavBarRequested } from '../components'

const ViewRequestedDataPage = ({
  handleChange,
  comment,
  setComment,
  deliveryType,
  fileStoreType,
  setFileStoreType,
  infoSentDetails,
  setInfoSentDetails,
  basicInfo,
  setBasicInfo,
  infoThirdDestination,
  setInfoThirdDestination,
  handleSubmit,
  loadingSend,
  control,
  infoDocument,
  handleBlurTercero,
}) => {
  return (
    <>
      <NavBarRequested />
      <Box
        sx={{
          width: '300px',
          height: '100px',
          overflow: 'hidden',
          marginLeft: { xs: '0', sm: '20px', md: '60px' },
          mt: '10px',
        }}
      >
        <img
          src='https://synchrox-cdn.s3.amazonaws.com/logo-cgr.png'
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
      <Box
        component='form'
        onSubmit={(ev) => {
          ev.preventDefault()
          handleSubmit()
        }}
        sx={{
          p: { xs: '0', sm: '20px', md: '80px' },
          py: { xs: '20px', md: '20px' },
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Box
          sx={{
            bgcolor: '#F6F6F6',
            height: 'auto',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
          }}
        >
          <Box
            sx={{
              bgcolor: '#E9E9E9',
              padding: '16px',
              borderBottom: '1px solid #DDD',
            }}
          >
            <Typography
              variant='h6'
              sx={{
                color: '#007FEC',
                paddingLeft: '8px',
                fontSize: '20px',
              }}
            >
              Cargue de información solicitada
            </Typography>
          </Box>
          <Box
            sx={{
              height: '90%',
              maxHeight: { xs: '750px', sm: '750px', md: '800px' },
              overflow: 'auto',
            }}
          >
            <ContainerForm
              handleChange={handleChange}
              comment={comment}
              setComment={setComment}
              deliveryType={deliveryType}
              fileStoreType={fileStoreType}
              setFileStoreType={setFileStoreType}
              infoSentDetails={infoSentDetails}
              setInfoSentDetails={setInfoSentDetails}
              control={control}
              infoDocument={infoDocument}
              basicInfo={basicInfo}
              setBasicInfo={setBasicInfo}
              infoThirdDestination={infoThirdDestination}
              setInfoThirdDestination={setInfoThirdDestination}
              handleBlurTercero={handleBlurTercero}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingX: '50px', pb: '20px' }}>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={loadingSend}
              >
                Enviar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ViewRequestedDataPage
