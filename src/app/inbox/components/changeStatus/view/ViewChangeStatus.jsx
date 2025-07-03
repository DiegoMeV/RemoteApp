import { BackdropLoading, ErrorPage, Loading } from '@/lib'
import { Box, Card, CardContent, Grid } from '@mui/material'
import { DescriptionField, ProcessInfo, StatusSelect, SubmitButton, TitleInfo } from '../components'
import { sxBackgroundModal } from '../styles'

const ViewChangeStatus = ({
  infoProcess,
  isLoading,
  isError,
  statusOptions,
  setValue,
  handleSubmit,
  onSubmit,
  control,
  isPending,
}) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <Box sx={sxBackgroundModal}>
          <BackdropLoading loading={isPending} />
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <ErrorPage />
          ) : (
            <Card sx={{ mb: '20px' }}>
              <CardContent sx={{ p: 0 }}>
                <TitleInfo />
                <Grid
                  container
                  mt={2}
                  spacing={2}
                  p={2}
                  component='form'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <ProcessInfo infoProcess={infoProcess} />
                  <StatusSelect
                    infoProcess={infoProcess}
                    setValue={setValue}
                    statusOptions={statusOptions}
                  />
                  <DescriptionField control={control} />
                  <SubmitButton />
                </Grid>
              </CardContent>
            </Card>
          )}
        </Box>
      )}
    </>
  )
}

export default ViewChangeStatus
