import { Box, Divider, Grid } from '@mui/material'
import { DocumentRow } from '../components'
import { BackdropLoading, ErrorPage } from '@/lib'

const ViewAddDocumentsComponent = ({
  setValue,
  fileRequired,
  uploadDoc,
  isPending,
  infoProcessSelected,
  idCompany,
  isError,
  idTaskAction,
  control,
  docsActivity,
  refetchInfoDocs,
  idActivityAction,
  idProcess,
  refetchInfoProcess,
}) => {
  return (
    <Box
      p={3}
      bgcolor={'backgroundWhite1'}
      borderRadius={'10px'}
    >
      <BackdropLoading loading={isPending} />
      {isError ? (
        <ErrorPage />
      ) : (
        <Grid
          container
          spacing={5}
        >
          {fileRequired?.map((fileRequired, index) => (
            <Grid
              item
              key={index}
              md={12}
            >
              <DocumentRow
                fileRequired={fileRequired}
                setValue={setValue}
                uploadDoc={uploadDoc}
                infoProcessSelected={infoProcessSelected}
                idCompany={idCompany}
                idTaskAction={idTaskAction}
                control={control}
                docsActivity={docsActivity}
                refetchInfoDocs={refetchInfoDocs}
                idActivityAction={idActivityAction}
                idProcess={idProcess}
                refetchInfoProcess={refetchInfoProcess}
              />
              <Divider />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default ViewAddDocumentsComponent
