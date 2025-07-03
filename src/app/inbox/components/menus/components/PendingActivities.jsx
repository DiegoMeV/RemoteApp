import { useGroupProcess } from '@/lib'
import { Box, CircularProgress } from '@mui/material'
import InboxMenuGroups from './InboxMenuGroups'

const PendingActivities = () => {
  const { data: infoSummary, isError, isLoading } = useGroupProcess()

  return (
    <>
      {isLoading ? (
        <Box textAlign='center'>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Box textAlign='center'>
          {'Ha ocurrido un error, no se pudo traer sus grupos de proceso'}
        </Box>
      ) : infoSummary?.data?.length === 0 ? (
        <Box
          display='flex'
          justifyContent='center'
        >
          No tiene actividades pendientes
        </Box>
      ) : (
        infoSummary?.data.map((app, index) => {
          return (
            <InboxMenuGroups
              app={app}
              index={index}
              key={index}
            />
          )
        })
      )}
    </>
  )
}

export default PendingActivities
