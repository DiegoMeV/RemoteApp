import { Box } from '@mui/material'
import { BasicProcess } from '../components'
import { BasicTitle, ErrorPage, Loading, useFiscalGroupsInfo } from '@/lib'

const ViewFiscalProcessGroup = () => {
  const { data: fiscalGroups, isFetching, isError } = useFiscalGroupsInfo()

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <Box
          sx={{
            borderRadius: '10px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
          }}
        >
          <BasicTitle
            title='Configuración de grupos de procesos fiscales'
            titleStyles={{ mb: 0, justifyContent: 'space-between' }}
          />
          <BasicProcess fiscalGroups={fiscalGroups.data} />
        </Box>
      )}
    </>
  )
}

export default ViewFiscalProcessGroup
